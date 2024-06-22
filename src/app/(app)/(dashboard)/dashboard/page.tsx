import { Stats } from '@/components/dashboard/stats';
import { NextPage } from 'next';

const Dashboard: NextPage = () => {
    return (
        <div>
            <Stats />
        </div>
    );
};

export default Dashboard;
export const dynamic = 'force-dynamic';
