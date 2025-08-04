import { vitePreprocess } from '@astrojs/svelte';
import path from 'path';
import { env } from 'process';



export default {
	preprocess: vitePreprocess({ script: true }),

	compilerOptions: {
		dev: env.NODE_ENV !== 'production',
		css: 'injected',
	},
	kit: {
		// Add path aliases here
		alias: {
			'@': path.resolve('./src'),
			'@components': path.resolve('./src/components'),
			'@lib': path.resolve('./src/lib'),
			'@config': path.resolve('./src/config'),
			'@image': path.resolve('./src/image'),
			'@types': path.resolve('./src/types'),
		},
	},
}
