import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: 'http://localhost:4000/graphql',
    documents: 'src/**/*.graphql',
    generates: {
        'src/graphql/generated.ts': {
            // preset: 'client',
            // config: { documentMode: 'string' },
            plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
        },
    },
};

export default config;
