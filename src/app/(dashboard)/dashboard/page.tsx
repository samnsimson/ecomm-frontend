import { Stats } from '@/components/dashboard/stats';
import { FC, HTMLAttributes } from 'react';

interface DashboardProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

const Dashboard: FC<DashboardProps> = ({ ...props }) => {
    return (
        <div>
            <Stats />
        </div>
    );
};

export default Dashboard;
