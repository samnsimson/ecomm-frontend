import { Page } from '@/components/page';
import { NextPage } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BanIcon, CheckCheckIcon, ListIcon, StarsIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { gql } from '@/lib/graphql-client';
import { GetOrdersDocument, GetOrdersQuery, GetOrdersQueryVariables, OrderStatus } from '@/graphql/generated';
import { ListOrders } from '@/components/dashboard/orders/list';

// type OrderData = Pick<Order, 'id' | 'total' | 'subTotal' | 'couponAmount' | 'discountAmount' | 'shippingAmount' | 'taxAmount'>;
// type OrderMeta = Pick<Order, 'createdAt' | 'updatedAt' | 'shippedAt' | 'cancelledAt' | 'fulfilledAt' | 'processedAt'>;
// type OrderItems = Pick<Order, 'items'>;
// type BillingData = Pick<Order, 'billingAddress'>;
// type ShippingData = Pick<Order, 'shippingAddress'>;
// type CustomerData = Pick<User, 'id'> & Pick<Profile, 'firstName' | 'lastName'>;

// type OrderList = {
//     order: OrderData;
//     customer: CustomerData;
//     billing: BillingData;
//     shipping: ShippingData;
//     meta: OrderMeta;
//     items: OrderItems;
// };

const tabList = [
    { name: 'allOrders', label: 'All', icon: <ListIcon /> },
    { name: 'newOrders', label: 'New', icon: <StarsIcon /> },
    { name: 'fullfilledOrders', label: 'Fullfilled', icon: <CheckCheckIcon /> },
    { name: 'cancelledOrders', label: 'Cancelled', icon: <BanIcon /> },
];

const OrdersPage: NextPage = async ({}) => {
    const { data } = await gql.request<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument);
    const tabData: Record<string, GetOrdersQuery['orders']> = {
        allOrders: data.orders.filter((x) => x.status && [OrderStatus.Created, OrderStatus.Fullfilled].includes(x.status)),
        newOrders: data.orders.filter((x) => x.status === OrderStatus.Created),
        fullfilledOrders: data.orders.filter((x) => x.status === OrderStatus.Fullfilled),
        cancelledOrders: data.orders.filter((x) => x.status === OrderStatus.Calcelled),
    };
    return (
        <Page title="Orders" description="Manage all your orders here">
            <Card className="overflow-hidden">
                <CardContent className="p-0">
                    <Tabs defaultValue={tabList[0]['name']}>
                        <TabsList className="flex items-center justify-evenly divide-x rounded-none">
                            {tabList.map((tab) => (
                                <TabsTrigger
                                    key={tab.name}
                                    className="flex w-full items-center space-x-3 rounded-none bg-accent p-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
                                    value={tab.name}
                                >
                                    {tab.icon}
                                    <span className="flex items-center space-x-1">
                                        <span>{tab.label}</span> <span>({tabData[tab.name].length})</span>
                                    </span>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {tabList.map((tab) => (
                            <TabsContent key={tab.name} className="my-0 p-0" value={tab.name}>
                                <ListOrders orders={tabData[tab.name]} />
                            </TabsContent>
                        ))}
                    </Tabs>
                </CardContent>
            </Card>
        </Page>
    );
};
export default OrdersPage;
