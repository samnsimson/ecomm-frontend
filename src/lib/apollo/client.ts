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

const errorLink = (refreshToken: string | undefined, updateSession: UpdateSession) => {
    return onError(({ graphQLErrors, networkError, operation, forward }) => {
        if (networkError) console.log(`[Network error]: ${networkError}`);
        if (graphQLErrors) {
            const promise = manageGraphQLErrors(graphQLErrors, refreshToken, operation, forward, updateSession);
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

const logOut = async () => {
    await signOut();
    return;
};

const manageGraphQLErrors = async (
    errors: GraphQLErrors,
    refreshToken: string | undefined,
    operation: Operation,
    forward: NextLink,
    updateSession: UpdateSession,
) => {
    for (const { extensions } of errors) {
        if (extensions.code === 'UNAUTHENTICATED') {
            const accessToken = await tokenRefresh(refreshToken);
            if (!accessToken) return forward(operation);
            const { headers = {} } = operation.getContext();
            operation.setContext({ headers: { ...headers, authorization: `Bearer ${accessToken}` } });
            console.log('retrying with new token...');
            return forward(operation);
        }
    }
};

export const apolloClient = (session: Session | null, updateSession: UpdateSession) => {
    const accessToken = session ? session.user?.accessToken : undefined;
    const refreshToken = session ? session.user?.refreshToken : undefined;
    return new ApolloClient({
        link: ApolloLink.from([errorLink(refreshToken, updateSession), httpLink(accessToken)]),
        cache: new InMemoryCache({
            typePolicies: {
                ProductOutput: {
                    keyFields: ['id', 'quantity'],
                },
            },
        }),
    });
};
