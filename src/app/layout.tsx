import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Providers from '@/providers';
import { Header } from '@/components/header';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={cn('bg-slate-50', montserrat.className)} suppressHydrationWarning>
                <Providers>
                    <section className="flex min-h-screen flex-col">
                        <Header />
                        <main className="flex flex-1 flex-col">{children}</main>
                    </section>
                </Providers>
            </body>
        </html>
    );
}
