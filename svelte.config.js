import { vitePreprocess } from '@astrojs/svelte';

export default {
	preprocess: vitePreprocess({ script: true }),

	compilerOptions: {
		dev: process.env.NODE_ENV !== 'production',
		css: 'injected',
		hydratable: true
	}
}
