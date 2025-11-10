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
	], // Make sure this matches your Rust server's GraphQL endpoint
	documents: ['src/**/*.ts'], // More specific path patterns
	ignoreNoDocuments: true, // Prevents the error when no documents are found
	generates: {
		'./src/types/__generated__/types.ts': {
			plugins: ['typescript', 'typescript-operations'],
		},
	},
};

export default config;
