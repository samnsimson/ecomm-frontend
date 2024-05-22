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
                    const { data } = await gql.request<LoginMutation, LoginMutationVariables>(LoginDocument, variables);
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
        // authorized: ({ auth, request: { nextUrl } }) => {
        //     const isLoggedIn = !!auth?.user;
        //     const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
        //     const isOnAccount = nextUrl.pathname.startsWith('/account');
        //     const isAdmin = auth?.user.role === 'admin';
        //     const isUser = auth?.user.role === 'user';
        //     if (isOnDashboard && (!isLoggedIn || !isAdmin)) return false;
        //     if (isOnAccount && (!isLoggedIn || !isUser)) return false;
        //     return true;
        // },
    },
    pages: {
        signIn: '/sign-in',
        newUser: '/sign-up',
    },
};
