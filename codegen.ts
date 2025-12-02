import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: [
		{
			'http://localhost:10020/graphql': {
				headers: {
					Authorization: `Bearer ${process.env.FAUST_SECRET_KEY}`,
				},
			},
		},
	],
	documents: [
		'src/**/*.ts',
		'src/lib/API/queries/**/*.ts',
		'src/lib/API/helpers.ts'
	],
	ignoreNoDocuments: true,
	generates: {
		'./src/types/__generated__/types.ts': {
			plugins: ['typescript', 'typescript-operations'],
		},


	},
};

export default config;
