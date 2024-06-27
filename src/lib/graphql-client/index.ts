import { DocumentNode, print } from 'graphql';
import axios from 'axios';
import { auth } from '../auth';
import { GraphQLErrors } from '@apollo/client/errors';

export const gql = {
    fetch: async <TData, TVariables>(document: DocumentNode, variables?: TVariables): Promise<{ data: TData }> => {
        try {
            const url = String(process.env.GRAPHQL_URL);
            const response = await axios.post<{ data: TData; errors: GraphQLErrors }>(url, { query: print(document), variables });
            const { data, errors } = response.data;
            if (errors) throw errors.map((err) => ({ ...err.extensions }));
            return { data };
        } catch (error: any) {
            throw new Error(JSON.stringify(error));
        }
    },
    request: async <TData, TVariables>(document: DocumentNode, variables?: TVariables): Promise<{ data: TData }> => {
        try {
            const url = String(process.env.GRAPHQL_URL);
            const session = await auth();
            const accessToken = session ? session.user.accessToken : null;
            const headers = { ...(accessToken && { authorization: `Bearer ${accessToken}` }) };
            const response = await axios.post<{ data: TData; errors: GraphQLErrors }>(url, { query: print(document), variables }, { headers });
            const { data, errors } = response.data;
            if (errors) throw errors.map((err) => ({ ...err.extensions }));
            return { data };
        } catch (error: any) {
            throw new Error(JSON.stringify(error));
        }
    },
};
