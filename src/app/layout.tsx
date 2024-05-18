import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { cn } from '@/libs/utils/cn';
import Providers from '@/providers';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn(montserrat.className)}>
                <Providers>
                    <div className="bg-hero bg-cover bg-center flex flex-col min-h-screen">
                        <Header />
                        <Hero />
                    </div>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
