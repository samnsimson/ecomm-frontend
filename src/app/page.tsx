import { ListUsers } from '../components/list-users';

export default function Home() {
    return (
        <div className="grid grid-cols-4 gap-3 p-3">
            <ListUsers />
        </div>
    );
}
