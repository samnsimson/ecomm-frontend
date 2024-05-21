import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { signInSchema } from './libs/zod/schemas';

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
                    return null;
                } catch (error: any) {
                    error.graphQLErrors.map((err: any) => console.log(err));
                    return null;
                }
            },
        }),
    ],
});
