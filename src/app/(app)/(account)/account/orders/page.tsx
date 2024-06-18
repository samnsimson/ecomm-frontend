import { ListOrders } from '@/components/order/client/list';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GetOrdersDocument, GetOrdersQuery, GetOrdersQueryVariables } from '@/graphql/generated';
import { gql } from '@/lib/graphql-client';
import { ShoppingCart } from 'lucide-react';

const OrdersPage = async () => {
    const { data } = await gql.request<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument);

    if (!data.orders.length) {
        return (
            <div className="border-default space-y-10 rounded border bg-accent p-4">
                <Alert variant="outline" color="info">
                    <AlertTitle>Nothing to list!</AlertTitle>
                    <AlertDescription>You have not placed any orders</AlertDescription>
                </Alert>
                <Button size="lg" startContent={<ShoppingCart />}>
                    Shop now
                </Button>
            </div>
        );
    }

    return (
        <Card className="divide-y">
            <CardHeader>
                <CardTitle>My Orders</CardTitle>
                <CardDescription>View all orders placed in the past</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <ListOrders orders={data.orders} />
            </CardContent>
        </Card>
    );
};
export default OrdersPage;
