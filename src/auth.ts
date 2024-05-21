import NextAuth from 'next-auth';
import { authConfig } from './libs/auth/config';

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
