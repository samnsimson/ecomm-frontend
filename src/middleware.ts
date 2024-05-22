import { auth } from './lib/auth';
import { NextResponse } from 'next/server';

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|sign-in|sign-up|.*\\.png$).*)'],
};

// export default NextAuth(authConfig).auth;
export default auth((req) => {
    const reqUrl = new URL(req.url);
    const session = req.auth;
    if (!session && reqUrl.pathname !== '/') {
        return NextResponse.redirect(new URL(`/api/auth/signin?callbackUrl=${encodeURIComponent(reqUrl.pathname)}`, req.url));
    }

    if (reqUrl.pathname.startsWith('/dashboard') && session && session.user.role === 'user') {
        return NextResponse.redirect(new URL('/account', req.url));
    }

    if (reqUrl.pathname.startsWith('/account') && session && session.user.role === 'admin') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }
});
