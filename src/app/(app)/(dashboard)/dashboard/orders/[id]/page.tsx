import { Page } from '@/components/page';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Timeline } from '@/components/ui/timeline';
import { GetOrderDocument, GetOrderQuery, GetOrderQueryVariables } from '@/graphql/generated';
import { gql } from '@/lib/graphql-client';
import { cn } from '@/lib/utils';
import { ArrowLeftIcon, MailIcon, PhoneIcon, UserIcon } from 'lucide-react';
import { NextPage } from 'next';
import Link from 'next/link';
import { FC } from 'react';

const PageAction: FC = () => {
    return (
        <Link href="/dashboard/orders" className={cn('flex items-center space-x-2', buttonVariants({ size: 'lg' }))}>
            <ArrowLeftIcon />
            <span>Back to orders</span>
        </Link>
    );
};

const OrderViewPage: NextPage = async ({ params: { id } }: Record<string, any>) => {
    const { data } = await gql.request<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, { id });
    if (!data) throw new Error('Order not found');
    return (
        <Page title="Order" description={`ID: ${id}`} action={<PageAction />}>
            <div className="grid grid-cols-2 gap-6">
                <div className="col-span-1 flex flex-col space-y-6">
                    <Card className=" divide-y">
                        <CardHeader condensed>
                            <CardTitle className="text-base">Customer</CardTitle>
                        </CardHeader>
                        <CardContent condensed>
                            <span className="flex items-center space-x-2">
                                <UserIcon className="text-secondary-foreground" strokeWidth={2} size={18} />
                                <span>{data.order.user.username}</span>
                            </span>
                            <span className="flex items-center space-x-2">
                                <MailIcon className="text-secondary-foreground" strokeWidth={2} size={18} />
                                <span>{data.order.user.email}</span>
                            </span>
                            <span className="flex items-center space-x-2">
                                <PhoneIcon className="text-secondary-foreground" strokeWidth={2} size={18} />
                                <span>{data.order.user.phone}</span>
                            </span>
                        </CardContent>
                    </Card>
                    <Card className="divide-y">
                        <CardHeader condensed>
                            <CardTitle className="text-base">Shipping Address</CardTitle>
                        </CardHeader>
                        <CardContent condensed>
                            <p>{data.order.shippingAddress.addressOne}</p>
                            <p>{data.order.shippingAddress.addressTwo}</p>
                            <p>
                                {data.order.shippingAddress.city}, {data.order.shippingAddress.state}
                            </p>
                            <p>
                                {data.order.shippingAddress.country} - {data.order.shippingAddress.zipcode}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="divide-y">
                        <CardHeader condensed>
                            <CardTitle className="text-base">Billing Address</CardTitle>
                        </CardHeader>
                        <CardContent condensed>
                            <p>{data.order.billingAddress.addressOne}</p>
                            <p>{data.order.billingAddress.addressTwo}</p>
                            <p>
                                {data.order.billingAddress.city}, {data.order.billingAddress.state}
                            </p>
                            <p>
                                {data.order.billingAddress.country} - {data.order.billingAddress.zipcode}
                            </p>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start" condensed>
                            <div className="flex items-center space-x-2">
                                <MailIcon className="text-secondary-foreground" strokeWidth={2} size={16} /> <span>{data.order.billingAddress.addressOne}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <PhoneIcon className="text-secondary-foreground" strokeWidth={2} size={16} />{' '}
                                <span>{data.order.billingAddress.addressOne}</span>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
                <div className="col-span-1 space-y-6">
                    <Card className="divide-y overflow-hidden">
                        <CardHeader condensed>
                            <CardTitle className="flex items-center justify-between text-base">
                                <span>Order info</span>
                                <Badge>{data.order.status}</Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-3 py-3">
                            <Table>
                                <TableBody>
                                    <TableRow className="border-0">
                                        <TableCell className="py-2">Sub total</TableCell>
                                        <TableCell className="py-2 text-right font-semibold">${data.order.subTotal}</TableCell>
                                    </TableRow>
                                    <TableRow className="border-0">
                                        <TableCell className="py-2">Tax</TableCell>
                                        <TableCell className="py-2 text-right font-semibold">${data.order.taxAmount}</TableCell>
                                    </TableRow>
                                    <TableRow className="border-0">
                                        <TableCell className="py-2">Shipping</TableCell>
                                        <TableCell className="py-2 text-right font-semibold">${data.order.shippingAmount}</TableCell>
                                    </TableRow>
                                    <TableRow className="border-0">
                                        <TableCell className="py-2">Discount</TableCell>
                                        <TableCell className="py-2 text-right font-semibold">${data.order.discountAmount}</TableCell>
                                    </TableRow>
                                    <TableRow className="border-0">
                                        <TableCell className="py-2">Coupon</TableCell>
                                        <TableCell className="py-2 text-right font-semibold">${data.order.couponAmount}</TableCell>
                                    </TableRow>
                                    <TableRow className="border-0">
                                        <TableCell className="py-2">Total</TableCell>
                                        <TableCell className="py-2 text-right font-semibold">${data.order.total}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader condensed>
                            <CardTitle className="text-base">Order Timeline</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Timeline />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Page>
    );
};
export default OrderViewPage;
