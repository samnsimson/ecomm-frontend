import { ListUsers } from '../components/list-users';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';

export default function Home() {
    return (
        <main>
            <div className="bg-hero bg-cover bg-center flex flex-col min-h-screen">
                <Header />
                <Hero />
            </div>
            <div className="grid grid-cols-4 gap-3 p-3">
                <ListUsers />
            </div>
        </main>
    );
}
