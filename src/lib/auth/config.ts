import { NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { signInSchema } from '../zod/schemas';
import { LoginDocument, LoginMutation, LoginMutationVariables } from '@/graphql/generated';
import { gql } from '../graphql-client';

export const authConfig: NextAuthConfig = {
    session: { strategy: 'jwt', maxAge: 24 * 60 * 60 },
    providers: [
        credentials({
            credentials: {
                username: { type: 'text', label: 'username' },
                password: { type: 'password', label: 'password' },
            },
            authorize: async (credentials) => {
                try {
                    const { username, password } = await signInSchema.parseAsync(credentials);
                    const variables: LoginMutationVariables = { input: { username, password } };
                    const { data } = await gql.auth<LoginMutation, LoginMutationVariables>(LoginDocument, variables);
                    return data.login;
                } catch (error: any) {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            return { ...token, ...user };
        },
        session: ({ session, token }) => {
            session.user = token as any;
            return session;
        },
    },
    pages: {
        signIn: '/sign-in',
        newUser: '/sign-up',
    },
};
