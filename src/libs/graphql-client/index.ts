import { DocumentNode, print } from 'graphql';
import axios from 'axios';

export const gql = {
    request: async <TData, TVariables>(document: DocumentNode, variables?: TVariables): Promise<{ data: TData }> => {
        try {
            const url = String(process.env.NEXT_PUBLIC_GRAPHQL_URL);
            const accessToken = true;
            const headers = { ...(accessToken && { authorization: `Bearer ${accessToken}` }) };
            const response = await axios.post(url, { query: print(document), variables }, { headers });
            const { data, errors } = response.data;
            if (errors && errors.length > 0) throw new Error(errors.map((error: { message: string }) => error.message).join('\n'));
            if (!data) throw new Error('No data returned from GraphQL endpoint');
            return { data };
        } catch (error: any) {
            throw new Error(`GraphQL request failed: ${error.message}`);
        }
    },
};
