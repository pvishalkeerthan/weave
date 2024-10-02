import {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: '../wb_schema.gql',
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/generated/': {
      plugins: [],
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
};

// tes
export default config;
