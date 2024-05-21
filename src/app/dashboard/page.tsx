import { signOut } from '@/auth';
import { Button } from '@nextui-org/react';
import { FC, HTMLAttributes } from 'react';

interface DashboardProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

const Dashboard: FC<DashboardProps> = ({ ...props }) => {
    const logoutAction = async () => {
        'use server';
        await signOut();
    };
    return (
        <div {...props}>
            <h1>You are in dashboard</h1>
            <form action={logoutAction}>
                <Button color="danger" size="lg" type="submit">
                    Logout
                </Button>
            </form>
        </div>
    );
};

export default Dashboard;
