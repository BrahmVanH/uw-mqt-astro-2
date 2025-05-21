import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    {
      "https://api.uwmqt.org/graphql": {
        headers: {
          Authorization: "Bearer",
        },
      },
    },
  ], // Make sure this matches your Rust server's GraphQL endpoint
  documents: ["src/**/*.ts"], // More specific path patterns
  ignoreNoDocuments: true, // Prevents the error when no documents are found
  generates: {
    "./src/__generated__/types.ts": {
      plugins: ["typescript", "typescript-operations"],
    },
  },
};

export default config;
