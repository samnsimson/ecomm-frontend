import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { GetOrdersDocument, GetOrdersQuery, GetOrdersQueryVariables } from '@/graphql/generated';
import { gql } from '@/lib/graphql-client';
import { ShoppingCart } from 'lucide-react';

const OrdersPage = async () => {
    const { data } = await gql.request<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument);

    if (!data.orders.length) {
        return (
            <div className="space-y-10 rounded border border-default bg-white p-4">
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

    return <div>OrdersPage</div>;
};
export default OrdersPage;
