import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Providers from '@/providers';
import { Toaster } from 'sonner';
import NextTopLoader from 'nextjs-toploader';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={cn('bg-background', montserrat.className)} suppressHydrationWarning>
                <NextTopLoader crawl={true} showSpinner={true} height={6} />
                <Providers>{children}</Providers>
                <Toaster richColors />
            </body>
        </html>
    );
}
