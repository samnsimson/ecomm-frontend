import { ListUsers } from '../components/list-users';
import { Hero } from '@/components/hero';

export default function Home() {
    return (
        <div className="flex flex-1 flex-col justify-center bg-hero bg-cover bg-center">
            <Hero />
        </div>
    );
}
