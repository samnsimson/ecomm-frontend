import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import { FC, PropsWithChildren } from 'react';

export const NextSessionProvider: FC<PropsWithChildren> = async ({ children }) => {
    const session = await auth();
    return <SessionProvider session={session}>{children}</SessionProvider>;
};
