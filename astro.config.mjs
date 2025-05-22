// @ts-check
import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';

import svelte from '@astrojs/svelte';

import icon from 'astro-icon';

import sitemap from '@astrojs/sitemap';

import netlify from '@astrojs/netlify';

import mdx from '@astrojs/mdx';

import partytown from '@astrojs/partytown';

import sentry from '@sentry/astro';

// const strippedWPUrl =
//   process.env.WP_URL_SRVR?.replace("https://", "") ??
//   "southshoretechnical.services";

export default defineConfig({
	env: {
		schema: {
			APP_ROOT_URL_CLNT: envField.string({
				context: 'client',
				access: 'public',
			}),
			APP_ROOT_URL_SRVR: envField.string({
				context: 'server',
				access: 'public',
			}),
			WP_URL_SRVR: envField.string({ context: 'server', access: 'public' }),
			WP_URL_SRVR_PROD: envField.string({
				context: 'server',
				access: 'public',
			}),
			WP_API_PASSWORD: envField.string({ context: 'server', access: 'secret' }),
			WP_API_USERNAME: envField.string({ context: 'server', access: 'secret' }),
			WP_URL_CLNT: envField.string({ context: 'client', access: 'public' }),
			YOOPERS_UNITED_ROOT_URL: envField.string({
				context: 'server',
				access: 'public',
			}),
			YOOPERS_UNITED_API_ROOT_URL: envField.string({
				context: 'server',
				access: 'public',
			}),
			YOOPERS_UNITED_API_TOKEN: envField.string({
				context: 'server',
				access: 'secret',
			}),
			FAUST_SECRET_KEY: envField.string({
				context: 'server',
				access: 'secret',
			}),
			STRIPE_SECRET_KEY: envField.string({
				context: 'server',
				access: 'secret',
			}),
			STRIPE_SIGNING_SECRET: envField.string({
				context: 'server',
				access: 'secret',
			}),
			STRIPE_PUBLISHABLE_KEY: envField.string({
				context: 'client',
				access: 'public',
			}),
			DONATE_QCD_URL: envField.string({
				context: 'server',
				access: 'public',
			}),
			DONATE_CHARITABLE_STOCK_URL: envField.string({
				context: 'server',
				access: 'public',
			}),
			DONATE_CRYPTO_URL: envField.string({
				context: 'server',
				access: 'public',
			}),
			UPSTASH_REDIS_URL: envField.string({
				context: 'server',
				access: 'secret',
			}),
			UPSTASH_REDIS_TOKEN: envField.string({
				context: 'server',
				access: 'secret',
			}),
		},
	},
	site: process.env.SITE || 'https://uwmqt.org',

	output: 'server',

	// vite: {
	//   server: {
	//     proxy: {
	//       "/graphql": {
	//         target: `${process.env.WP_URL_SRVR_PROD ?? "https://api.uwmqt.org"}`,
	//         changeOrigin: true,
	//       },
	//       "^/wp-content/.*": {
	//         target: "https://api.uwmqt.org",
	//         changeOrigin: true,
	//         secure: true,
	//         rewrite: (path) => path,
	//       },
	//     },
	//   },
	// },
	prefetch: true,
	image: {
		domains: [`${process.env.WP_URL_SRVR_PROD ?? 'https://api.uwmqt.org'}`],
	},
	integrations: [
		react({
			babel: {
				plugins: [['babel-plugin-react-compiler']],
			},
		}),
		icon(),
		sitemap(),
		mdx(),
		sentry({
			dsn: process.env.SENTRY_DSN,
			sourceMapsUploadOptions: {
				project: 'uw-mqt',
				authToken: process.env.SENTRY_AUTH_TOKEN,
			},
		}),
		svelte(),
		svelteSVG(),
		partytown({ config: { debug: false, forward: ['dataLayer.push'] } }),
	],

	adapter: netlify({
		imageCDN: false,
	}),
});
