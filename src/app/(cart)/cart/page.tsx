import { CartList } from '@/components/cart/list';
import { Page } from '@/components/page';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NextPage } from 'next';

const CartPage: NextPage = () => {
    return (
        <Page title="Cart" description="View & Manage items added to your cart">
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                    <Card className="divide-y">
                        <CardHeader>
                            <CardTitle>items</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <CartList />
                        </CardContent>
                    </Card>
                </div>
                <div className="col-span-1">
                    <Card className="divide-y">
                        <CardHeader>
                            <CardTitle>Checkout Info</CardTitle>
                        </CardHeader>
                        <CardContent></CardContent>
                    </Card>
                </div>
            </div>
        </Page>
    );
};
export default CartPage;
