import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { APP_ROOT_URL_CLNT } from 'astro:env/client';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import type { LatLng } from 'leaflet';
import type { FoodPantry, FoodPantryGeoFeatureCollection } from '@/types';
import type { Feature, Position } from 'geojson';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const isExternalUrl = (url: string) => {
	if (!url) return false;

	// Handle URLs that start with our app root as internal
	if (url.startsWith(APP_ROOT_URL_CLNT) || url.startsWith('/')) {
		return false;
	}

	// All other URLs are considered external
	return true;
};

// this function removes the last sentence from a text string
export function removeLastSentence(text: string): string {
	return text.split('.').slice(0, -2) + '.';
}
// returns a string preview of a text string with the the first specified number of characters minus 3 plus 3 dots
export function getStringPreview(text: string, length: number = 200): string {
	return text.slice(0, length - 3) + '...';
}

// replaces the word "and" with an ampersand in a text string
export function formatHeroHeadingText(text: string): string {
	return text.toLocaleLowerCase().replace(' and ', ' & ').toUpperCase();
}

export function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeFirstLetters(string: string) {
	return string
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

// checks if the browser supports webp images
export function supportsWebP(request: Request): boolean {
	const accept = request.headers.get('Accept') ?? '';
	return accept.includes('image/webp');
}

interface CheckForFocusElementReturnObject {
	found: boolean;
	id?: string;
}
export function checkAndGetUrlFocusElement(url: string, ids: string[]): CheckForFocusElementReturnObject {
	const urlParts = url.split('#');
	const urlHash = urlParts[1];

	const found = ids.includes(urlHash);
	if (found && urlHash) {
		return { found, id: urlHash };
	}

	return { found };
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (node: Element, params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t,
			});
		},
		easing: cubicOut,
	};
};


export const getGeoJsonGroupCenter = (coordinates: number[][]) => {
	// const positions = geoJsonRouteData.features[0].geometry.coordinates;
	const latitudes = coordinates.map((position: Position) => position[1]);
	const longitudes = coordinates.map((position: Position) => position[0]);

	const minLat = Math.min(...latitudes);
	const maxLat = Math.max(...latitudes);
	const minLon = Math.min(...longitudes);
	const maxLon = Math.max(...longitudes);

	const center = { lat: (maxLat + minLat) / 2, lng: (maxLon + minLon) / 2 };
	return center;
};

// calculate distance between two coordinates using Haversine formula returns distance in miles
export const getDistance = (coord1: LatLng, coord2: LatLng) => {
	// Earth's radius in meters
	const R = 6371e3;

	const lat1 = (coord1.lat * Math.PI) / 180;
	const lat2 = (coord2.lat * Math.PI) / 180;
	const deltaLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
	const deltaLon = ((coord2.lng - coord1.lng) * Math.PI) / 180;

	const a =
		Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
		Math.cos(lat1) *
		Math.cos(lat2) *
		Math.sin(deltaLon / 2) *
		Math.sin(deltaLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	const distance = R * c;
	const distanceInMiles = distance * 0.000621371;

	return distanceInMiles;
};

export const pantriesToPantryFeatures = (
	pantries: FoodPantry[],
): FoodPantryGeoFeatureCollection => {
	let id = 0;
	const features = pantries.map((pantry) => {
		id++;
		return {
			type: "Feature",
			properties: {
				id,
				name: pantry.name,
				street: pantry.address.street,
				city: pantry.address.city,
				state: pantry.address.state,
				zip: pantry.address.zip,
				phone: pantry.phone,
				email: pantry.email,
				website: pantry.website,
			},
			geometry: {
				type: "Point",
				coordinates: [pantry.geo.lng, pantry.geo.lat],
			},
			id: pantry.name.toLowerCase().split(".").join(" ").split(" ").join("-"),
		} as Feature;
	});

	return {
		type: "FeatureCollection",
		features,
	};
};

export const sortPantriesByClosest = (
	center: LatLng | null,
	pantries: FoodPantry[] | undefined,
): FoodPantry[] => {
	if (center && pantries) {
		const { lat, lng } = center;

		const sorted = [...pantries].sort((a, b) => {
			const distanceA = getDistance(
				{ lat: a.geo.lat, lng: a.geo.lng } as LatLng,
				{ lat, lng } as LatLng,
			);
			const distanceB = getDistance(
				{ lat: b.geo.lat, lng: b.geo.lng } as LatLng,
				{ lat, lng } as LatLng,
			);

			// Sort closest first
			return distanceA - distanceB;
		});

		return sorted;
	}
	return pantries ?? [];
};



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
