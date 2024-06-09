import { Header } from '@/components/header';
import { FC, PropsWithChildren } from 'react';

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <section className="flex min-h-screen flex-col">
            <Header />
            <main className="flex flex-1 flex-col">{children}</main>
        </section>
    );
};
export default AppLayout;
