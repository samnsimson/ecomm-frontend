import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { signInSchema } from './libs/zod/schemas';
import { LoginDocument, LoginMutation, LoginMutationVariables } from './graphql/generated';
import { gql } from './libs/graphql-client';
import { cookies } from 'next/headers';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: { type: 'text', label: 'username' },
                password: { type: 'password', label: 'password' },
            },
            authorize: async (credentials) => {
                try {
                    const { username, password } = await signInSchema.parseAsync(credentials);
                    const variables: LoginMutationVariables = { input: { username, password } };
                    const { data } = await gql.request<LoginMutation, LoginMutationVariables>(LoginDocument, variables);
                    const { accessToken, refreshToken, ...rest } = data.login;
                    cookies().set('accessToken', accessToken);
                    cookies().set('refreshToken', refreshToken);
                    return rest;
                } catch (error: any) {
                    return null;
                }
            },
        }),
    ],
});
