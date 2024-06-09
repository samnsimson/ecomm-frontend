import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, Operation, NextLink } from '@apollo/client';
import { GraphQLErrors } from '@apollo/client/errors';
import { onError } from '@apollo/client/link/error';
import { gql } from '../graphql-client';
import { fromPromise } from '@apollo/client/link/utils';
import { RefreshTokenDocument, RefreshTokenMutation, RefreshTokenMutationVariables } from '@/graphql/generated';
import { UpdateSession, signOut } from 'next-auth/react';
import { Session } from 'next-auth';

const httpLink = (accessToken: string | undefined) => {
    return new HttpLink({
        uri: String(process.env.NEXT_PUBLIC_GRAPHQL_URL),
        headers: { ...(accessToken && { authorization: `Bearer ${accessToken}` }) },
        credentials: 'include',
    });
};

const errorLink = (refreshToken: string | undefined, callback: (accessToken: string) => void) => {
    return onError(({ graphQLErrors, operation, forward }) => {
        if (graphQLErrors) {
            const promise = manageGraphQLErrors(graphQLErrors, refreshToken, operation, forward, callback);
            return fromPromise(promise).flatMap(() => forward(operation));
        }
    });
};

const tokenRefresh = async (token: string | undefined) => {
    if (!token) return null;
    const { data } = await gql.auth<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, { input: { token } });
    if (!data) return null;
    return null;
};

const manageGraphQLErrors = async (
    errors: GraphQLErrors,
    refreshToken: string | undefined,
    operation: Operation,
    forward: NextLink,
    callback: (accessToken: string) => void,
) => {
    for (const { extensions } of errors) {
        if (extensions.code === 'UNAUTHENTICATED') {
            const accessToken = await tokenRefresh(refreshToken);
            if (!accessToken) await signOut({ redirect: false });
            accessToken && callback(accessToken);
            const { headers = {} } = operation.getContext();
            operation.setContext({ headers: { ...headers, authorization: `Bearer ${accessToken}` } });
            return forward(operation);
        }
    }
};

export const apolloClient = (session: Session | null, updateSession: UpdateSession) => {
    const accessToken = session ? session.user?.accessToken : undefined;
    const refreshToken = session ? session.user?.refreshToken : undefined;

    const sessionUpdate = async (accessToken: string) => {
        session && (await updateSession({ ...session, user: { ...session.user, accessToken } }));
    };

    return new ApolloClient({
        link: ApolloLink.from([errorLink(refreshToken, sessionUpdate), httpLink(accessToken)]),
        cache: new InMemoryCache({
            typePolicies: {
                ProductOutput: {
                    keyFields: ['id', 'quantity'],
                },
            },
        }),
    });
};
