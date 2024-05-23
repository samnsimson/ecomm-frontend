import { auth } from './lib/auth';
import { NextResponse } from 'next/server';

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|sign-in|sign-up|.*\\.png$).*)'],
};

// export default NextAuth(authConfig).auth;
export default auth((req) => {
    const url = new URL(req.url);

    // set headers to be accesssed in server component
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-url', req.url);
    requestHeaders.set('x-origin', url.origin);
    requestHeaders.set('x-pathname', url.pathname);

    const session = req.auth;
    if (!session && url.pathname !== '/') {
        return NextResponse.redirect(new URL(`/api/auth/signin?callbackUrl=${encodeURIComponent(url.pathname)}`, req.url));
    }

    if (url.pathname.startsWith('/dashboard') && session && session.user.role === 'user') {
        return NextResponse.redirect(new URL('/account', req.url));
    }

    if (url.pathname.startsWith('/account') && session && session.user.role === 'admin') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next({ request: { headers: requestHeaders } });
});
