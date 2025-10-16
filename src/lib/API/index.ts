import { isServer } from '../environment';
import { getDefaultPageProps, getDefaultProps, gracefullyGetDefaultProps, onError } from '../error';
import { getContentQuery } from './helpers';
import { WP_URL_SRVR, WP_URL_SRVR_PROD, WP_API_USERNAME, WP_API_PASSWORD, YOOPERS_UNITED_API_TOKEN, YOOPERS_UNITED_API_ROOT_URL, APP_ROOT_URL_SRVR } from 'astro:env/server';
import type { YoopersUnitedNeed, YoopersUnitedNeedsFetchResponse } from '@/types/index';

import { WP_URL_CLNT } from 'astro:env/client';
import { getOrRefreshTokens, getRedis } from '../redis';
import { gql } from 'graphql-request';
import { sanitizeHTML } from './sanitize';

interface CacheOptions {
	ttl?: number;
	retryAttempts?: number;
	retryDelay?: number;
}

export interface AuthTokens {
	authToken: string;
	refreshToken: string;
}

const DEFAULT_OPTIONS: CacheOptions = {
	ttl: 60 * 60 * 24,
	retryAttempts: 3,
	retryDelay: 1000,
};

export async function getAuthTokens(): Promise<AuthTokens> {
	const wpUrl = import.meta.env.PROD ? WP_URL_SRVR_PROD : WP_URL_SRVR;
	const LOGIN_MUTATION = gql`
		mutation LoginUser($username: String!, $password: String!) {
			login(input: { username: $username, password: $password }) {
				authToken
				refreshToken
			}
		}
	`;

	try {

		const response = await fetch(`${wpUrl}/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: LOGIN_MUTATION,
				variables: {
					username: WP_API_USERNAME,
					password: WP_API_PASSWORD,
				},
			}),
		});


		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const { data } = await response.json();
		if (!data || data?.errors) {
			throw new Error(data?.errors[0]?.message);
		}
		return {
			authToken: data?.login?.authToken,
			refreshToken: data?.login?.refreshToken,
		};
	} catch (error) {
		return getDefaultProps(`ERROR IN getAuthToken ${error}`);
	}
}

export async function refreshAuthToken(refreshToken: string): Promise<AuthTokens> {
	const wpUrl = import.meta.env.PROD ? WP_URL_SRVR_PROD : WP_URL_SRVR;
	const query = gql`
		mutation RefreshToken($input: RefreshJwtAuthTokenInput!) {
			refreshJwtAuthToken(input: $input) {
				authToken
			}
		}
	`;

	if (!refreshToken) {
		throw new Error('No refresh token provided');
	}

	try {
		const response = await fetch(`${wpUrl}/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query,
				variables: {
					input: {
						refreshToken,
					},
				},
			}),
		});



		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const { data } = await response.json();
		if (!data?.refreshToken || (!data?.refreshToken && data?.errors)) {
			throw new Error(data?.errors[0]?.message);
		}
		return data.refreshJwtAuthToken;
	} catch (error) {
		return gracefullyGetDefaultProps(`ERROR IN refreshAuthToken ${error}`);
	}
}

export async function getCachedData<T>(key: string, fetchFn: () => Promise<T>, options: CacheOptions = DEFAULT_OPTIONS): Promise<T> {
	const {
		ttl = 60 * 60 * 24, // Invalidate after 24 hours
		retryAttempts = 5,
		retryDelay = 1000,
	} = { ...DEFAULT_OPTIONS, ...options };

	const redis = getRedis();

	async function retryOperation(operation: () => Promise<any>, attempts: number): Promise<any> {
		try {
			return await operation();
		} catch (error) {
			if (attempts <= 1) throw error;

			// const delay = retryDelay * Math.pow(2, attempt - 1);
			// console.warn(
			//   `Redis operation failed (attempt ${attempt}/${retryAttempts}). Retrying in ${delay}ms...`,
			// );

			// await new Promise((resolve) => setTimeout(resolve, delay));
			await new Promise((resolve) => setTimeout(resolve, retryDelay));
			return retryOperation(operation, attempts - 1);
		}
	}
	try {
		if (import.meta.env.PROD) {
			const cachedData = await retryOperation(() => redis.get(key), retryAttempts);
			if (typeof cachedData === 'string' && cachedData.trim().startsWith('{')) {
				try {
					return JSON.parse(cachedData);
				} catch (parseError) {
					onError(`Error parsing cached data: ${parseError}`);
				}
			}
		}
		const freshData = await fetchFn();

		if (import.meta.env.PROD && freshData) {
			await retryOperation(() => redis.set(key, JSON.stringify(freshData), { ex: ttl }), retryAttempts);
		}
		return freshData;
	} catch (error) {
		try {
			// console.warn(
			//   `Cache operation failed for key "${key}", attempting direct fetch`,
			// );
			// const directData = await fetchFn();
			// if (directData) return directData;

			// throw new Error(`Failed to fetch data for key: ${key}`);
			return await fetchFn();
		} catch (fetchError) {
			return getDefaultProps<T>(`Error fetching data: ${fetchError}`);
		}
	}
}



export default async function getPageContent(path: string, variables = {}) {
	const query = getContentQuery(path);
	// getContentDev(path)
	if (!query) {
		throw new Error('No query found for path "' + path + '"');
	}

	let data;

	try {
		if (!import.meta.env.PROD) {

			// const data = getPageContentDev(path)


			const response = await fetch(`${WP_URL_SRVR}/graphql`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ query, variables }),
			});


			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			data = await response.json();

			data = data.data;
			if (!data || data?.errors) {
				throw new Error(data?.errors[0]?.message);
			}

			return data;
		}

		const cacheKey = `pageContent:${path}:${JSON.stringify(variables)}`;
		const auth = await getOrRefreshTokens();



		data = await getCachedData(cacheKey, async () => {
			const response = await fetch(`${WP_URL_SRVR_PROD}/graphql`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth}`,
				},
				body: JSON.stringify({ query, variables }),
			});

			const { data } = await response.json();
			if (!data || data?.errors) {
				throw new Error(data.errors[0].message);
			}
			return data;
		});
		if (!data) {
			throw new Error(`No data found for path: ${path}`);
		}
		return data;
	} catch (error) {
		return getDefaultPageProps(`ERROR IN getPageContent ${error}`);
	}
}

export async function getContent(query: string, variables = {}) {
	let wpUrl: string;
	if (!isServer) {
		wpUrl = WP_URL_CLNT;
	} else {
		wpUrl = import.meta.env.PROD ? WP_URL_SRVR_PROD : WP_URL_SRVR;
	}
	const queryName = query.split('{')[0].split('query')[1].trim();
	const cacheKey = `componentContent:${queryName}:${JSON.stringify(variables)}`;

	// Redirect to get local data from json file. 
	// Uncomment block and comment out try...catch block to use local data
	// if (!import.meta.env.PROD) {
	// 	const devData = getContentDev(cacheKey);
	// 	return devData;
	// }
	try {
		if (!import.meta.env.PROD) {

			const response = await fetch(`${wpUrl}/graphql`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ query, variables }),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			if (!data || data?.errors) {
				throw new Error(data?.errors[0]?.message);
			}
			return data;
		}
		const auth = await getOrRefreshTokens();

		if (!auth) {
			throw new Error('No token found');
		}
		const data = await getCachedData(cacheKey, async () => {
			const response = await fetch(`${wpUrl}/graphql`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth}`,
				},
				body: JSON.stringify({ query, variables }),
			});




			const data = await response.json();
			if (!data || data?.errors) {
				throw new Error(data.errors[0].message);
			}
			return data;
		});
		if (!data) {
			throw new Error(`No data found for query: ${query}`);
		}
		return data;
	} catch (error) {
		return getDefaultProps(`ERROR IN getContent ${error}`);
	}
}

export async function fetchGalaxyDigitalNeedsData() {
	const now = new Date()
	const nowMinus3M = new Date(now);
	nowMinus3M.setMonth(now.getMonth() - 3)
	const auth = `Bearer ${YOOPERS_UNITED_API_TOKEN}`;
	if (!auth) {
		throw new Error('No token found');
	}


	try {

		const params = new URLSearchParams({
			per_page: '100',
			page: '1',
			need_status: 'active',
			show_inactive: 'No',
			sort: 'asc',
			sort_by: 'date',
			since_created: nowMinus3M.toISOString()

		});

		const response = await fetch(`${YOOPERS_UNITED_API_ROOT_URL}/needs?${params.toString()}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: auth,
			},
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}



		const responseData = await response.json();


		if (!responseData?.data || !Array.isArray(responseData?.data)) {
			throw new Error('Invalid response format');
		}



		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const validNeeds: YoopersUnitedNeed[] = responseData.data
			.filter((need: YoopersUnitedNeed) => {
				const needDate = new Date(need.need_date);
				needDate.setHours(0, 0, 0, 0);
				return !isNaN(needDate.getTime()) && need.agency.agency_name !== 'Sample Agency' && (need.need_date_type === 'until' || need.need_date_type === 'multi' || needDate >= today);
			})
			.slice(0, 10)
			.map((need: YoopersUnitedNeed) => {
				const sanitized_need_body = sanitizeHTML(need.need_body)
				return {
					...need,
					need_body: sanitized_need_body
				} as YoopersUnitedNeed
			})
			.reverse();

		if (!validNeeds) {
			throw new Error('No yoopers united galaxy digital data found');
		}


		return { data: validNeeds }
	} catch (err) {
		return getDefaultProps<YoopersUnitedNeedsFetchResponse>(`VolunteerNeeds fetchGalaxyDigitalNeedsData: ${err}`);
	}
}

export async function getGalaxyDigitalNeedsData() {
	const auth = `Bearer ${YOOPERS_UNITED_API_TOKEN}`;
	if (!auth) {
		throw new Error('No token found');
	}

	const cacheKey = 'yoopersUnitedNeedsData';
	try {
		if (import.meta.env.DEV) {

			const volunteerNeeds = await fetchGalaxyDigitalNeedsData();

			if (!volunteerNeeds) {
				throw new Error("Error getting volunteer needs");
			}

			return volunteerNeeds

		}

		const data = await getCachedData(cacheKey, () => fetchGalaxyDigitalNeedsData());
		if (!data) {
			throw new Error('Error getting volunteer needs');
		}

		return data;
	} catch (error) {
		return getDefaultProps<YoopersUnitedNeedsFetchResponse>('VolunteerNeeds fetchGalaxyDigitalNeedsData');
	}
}
