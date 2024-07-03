import { CartList } from '@/components/cart/list';
import { Page } from '@/components/page';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { NextPage } from 'next';
import Link from 'next/link';

const CartPage: NextPage = () => {
    return (
        <Page title="Cart" description="View & Manage items added to your cart">
            <Card className="divide-y">
                <CardHeader>
                    <CardTitle>Items</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <CartList />
                </CardContent>
            </Card>
            <div className="flex items-center justify-end space-x-3">
                <Link href="/shop" className={cn('flex items-center space-x-2', buttonVariants({ variant: 'secondary', size: 'lg' }))}>
                    <ArrowLeftIcon />
                    <span>Continue shopping</span>
                </Link>
                <Link href="/checkout" className={cn('flex items-center space-x-2', buttonVariants({ size: 'lg' }))}>
                    <span>Checkout</span>
                    <ArrowRightIcon />
                </Link>
            </div>
        </Page>
    );
};
export default CartPage;
export const dynamic = 'force-dynamic';
