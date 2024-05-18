import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { signInSchema } from './libs/zod/schemas';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user = null;
                const { username, password } = await signInSchema.parseAsync(credentials);
                return user;
            },
        }),
    ],
});
