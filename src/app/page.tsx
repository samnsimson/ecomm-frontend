import { Button } from '@nextui-org/react';
import { LoaderIcon } from 'lucide-react';

export default function Home() {
    return (
        <div className="grid grid-cols-4 gap-3 p-3">
            <Button variant="solid" size="lg" color="danger" radius="none">
                This is a button
            </Button>
            <Button variant="solid" size="lg" color="success" isLoading disabled>
                This is a button
            </Button>
            <Button variant="solid" size="lg" color="default">
                This is a button
            </Button>
            <Button variant="solid" size="lg" color="primary">
                This is a button
            </Button>
            <Button variant="solid" size="lg" color="secondary">
                This is a button
            </Button>
            <Button radius="full" size="lg" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
                This is a button
            </Button>
        </div>
    );
}
