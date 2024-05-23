import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FC, HTMLAttributes } from 'react';

interface StatsProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const Stats: FC<StatsProps> = ({ ...props }) => {
    return (
        <div className="grid grid-cols-3 gap-6">
            <Card className="shadow-none">
                <CardHeader>
                    <CardTitle>Orders</CardTitle>
                </CardHeader>
                <CardContent>Stats</CardContent>
            </Card>
            <Card className="shadow-none">
                <CardHeader>
                    <CardTitle>Sales</CardTitle>
                </CardHeader>
                <CardContent>Stats</CardContent>
            </Card>
            <Card className="shadow-none">
                <CardHeader>
                    <CardTitle>Revenue</CardTitle>
                </CardHeader>
                <CardContent>Stats</CardContent>
            </Card>
        </div>
    );
};
