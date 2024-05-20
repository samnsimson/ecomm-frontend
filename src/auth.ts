import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { signInSchema } from './libs/zod/schemas';
import { getClient } from './libs/apollo/client';
import { LoginDocument, LoginMutationResult, LoginMutationVariables } from './graphql/generated';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: { type: 'text', label: 'username' },
                password: { type: 'password', label: 'password' },
            },
            authorize: async (credentials) => {
                try {
                    const client = getClient();
                    const { username, password } = await signInSchema.parseAsync(credentials);
                    const variables: LoginMutationVariables = { input: { username, password } };
                    const { data } = await client.mutate<LoginMutationResult['data']>({ mutation: LoginDocument, variables });
                    return data ? data.login : null;
                } catch (error: any) {
                    error.graphQLErrors.map((err: any) => console.log(err));
                    return null;
                }
            },
        }),
    ],
});
