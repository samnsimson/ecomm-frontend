import { Page } from '@/components/page';
import { NextPage } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCheckIcon, ListIcon, StarsIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { List, ListItem } from '@/components/list';

const tabList = [
    { name: 'all-orders', label: 'All Orders', icon: <ListIcon /> },
    { name: 'new-orders', label: 'New Orders', icon: <StarsIcon /> },
    { name: 'fullfilled-orders', label: 'Fullfilled Orders', icon: <CheckCheckIcon /> },
];

const OrdersPage: NextPage = ({}) => {
    return (
        <Page title="Orders" description="Manage all your orders here">
            <Card className="overflow-hidden">
                <CardContent className="p-0">
                    <Tabs defaultValue={tabList[0]['name']}>
                        <TabsList className="flex items-center justify-evenly divide-x rounded-none">
                            {tabList.map((tab) => (
                                <TabsTrigger
                                    key={tab.name}
                                    className="flex w-full items-center space-x-3 rounded-none p-3 text-base data-[state=active]:shadow-none"
                                    value={tab.name}
                                >
                                    {tab.icon} <span>{tab.label}</span>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {tabList.map((tab) => (
                            <TabsContent key={tab.name} className="my-0 p-0" value={tab.name}>
                                <List>
                                    <ListItem className="p-4">Your orders appear here</ListItem>
                                    <ListItem className="p-4">Your orders appear here</ListItem>
                                </List>
                            </TabsContent>
                        ))}
                    </Tabs>
                </CardContent>
            </Card>
        </Page>
    );
};
export default OrdersPage;
