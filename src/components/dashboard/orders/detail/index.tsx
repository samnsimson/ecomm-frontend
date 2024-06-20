'use client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Timeline } from '@/components/ui/timeline';
import { useOrder } from '@/providers/order.provider';
import { BanIcon, MailIcon, PhoneIcon, UserIcon } from 'lucide-react';
import { FC, HTMLAttributes } from 'react';
import { OrderStatusBadge } from '../status-badge';
import { OrderStatus } from '@/graphql/generated';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface OrderDetailProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const OrderDetail: FC<OrderDetailProps> = ({ ...props }) => {
    const { order, updateOrder } = useOrder();
    if (!order) return null;
    return (
        <div className="grid grid-cols-2 gap-6">
            <div className="col-span-1 flex flex-col space-y-6">
                <Card className=" divide-y">
                    <CardHeader condensed>
                        <CardTitle className="text-base">Customer</CardTitle>
                    </CardHeader>
                    <CardContent condensed>
                        <span className="flex items-center space-x-2">
                            <UserIcon className="text-secondary-foreground" strokeWidth={2} size={18} />
                            <span>{order.user.username}</span>
                        </span>
                        <span className="flex items-center space-x-2">
                            <MailIcon className="text-secondary-foreground" strokeWidth={2} size={18} />
                            <span>{order.user.email}</span>
                        </span>
                        <span className="flex items-center space-x-2">
                            <PhoneIcon className="text-secondary-foreground" strokeWidth={2} size={18} />
                            <span>{order.user.phone}</span>
                        </span>
                    </CardContent>
                </Card>
                <Card className="divide-y">
                    <CardHeader condensed>
                        <CardTitle className="text-base">Shipping Address</CardTitle>
                    </CardHeader>
                    <CardContent condensed>
                        <p>{order.shippingAddress.addressOne}</p>
                        <p>{order.shippingAddress.addressTwo}</p>
                        <p>
                            {order.shippingAddress.city}, {order.shippingAddress.state}
                        </p>
                        <p>
                            {order.shippingAddress.country} - {order.shippingAddress.zipcode}
                        </p>
                    </CardContent>
                </Card>
                <Card className="divide-y">
                    <CardHeader condensed>
                        <CardTitle className="text-base">Billing Address</CardTitle>
                    </CardHeader>
                    <CardContent condensed>
                        <p>{order.billingAddress.addressOne}</p>
                        <p>{order.billingAddress.addressTwo}</p>
                        <p>
                            {order.billingAddress.city}, {order.billingAddress.state}
                        </p>
                        <p>
                            {order.billingAddress.country} - {order.billingAddress.zipcode}
                        </p>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start" condensed>
                        <div className="flex items-center space-x-2">
                            <MailIcon className="text-secondary-foreground" strokeWidth={2} size={16} /> <span>{order.billingAddress.addressOne}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <PhoneIcon className="text-secondary-foreground" strokeWidth={2} size={16} /> <span>{order.billingAddress.addressOne}</span>
                        </div>
                    </CardFooter>
                </Card>
                <Card className="overflow-hidden">
                    <CardHeader condensed>
                        <CardTitle className="text-base">Items</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Accordion type="multiple">
                            {order.items.map((item, key) => (
                                <AccordionItem key={key} value={item.id} className="divide-y rounded" onClick={() => null}>
                                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                                        <CardTitle className="text-sm text-secondary-foreground">{item.product.title}</CardTitle>
                                    </AccordionTrigger>
                                    <AccordionContent className="p-0">
                                        <Table className="bg-muted">
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell className="py-2 font-semibold text-muted-foreground">ID</TableCell>
                                                    <TableCell className="py-2">{item.id}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="py-2 font-semibold text-muted-foreground">Price</TableCell>
                                                    <TableCell className="py-2">${item.price}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="py-2 font-semibold text-muted-foreground">Quantity</TableCell>
                                                    <TableCell className="py-2">{item.quantity}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
            <div className="col-span-1 space-y-6">
                <Card className="divide-y overflow-hidden">
                    <CardHeader condensed>
                        <CardTitle className="flex items-center justify-between text-base">
                            <span>Order info</span>
                            <OrderStatusBadge status={order.status as OrderStatus} />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-3 py-3">
                        <Table>
                            <TableBody>
                                <TableRow className="border-0">
                                    <TableCell className="py-2">Sub total</TableCell>
                                    <TableCell className="py-2 text-right font-semibold">${order.subTotal}</TableCell>
                                </TableRow>
                                <TableRow className="border-0">
                                    <TableCell className="py-2">Tax</TableCell>
                                    <TableCell className="py-2 text-right font-semibold">${order.taxAmount}</TableCell>
                                </TableRow>
                                <TableRow className="border-0">
                                    <TableCell className="py-2">Shipping</TableCell>
                                    <TableCell className="py-2 text-right font-semibold">${order.shippingAmount}</TableCell>
                                </TableRow>
                                <TableRow className="border-0">
                                    <TableCell className="py-2">Discount</TableCell>
                                    <TableCell className="py-2 text-right font-semibold">${order.discountAmount}</TableCell>
                                </TableRow>
                                <TableRow className="border-0">
                                    <TableCell className="py-2">Coupon</TableCell>
                                    <TableCell className="py-2 text-right font-semibold">${order.couponAmount}</TableCell>
                                </TableRow>
                                <TableRow className="border-0">
                                    <TableCell className="py-2">Total</TableCell>
                                    <TableCell className="py-2 text-right font-semibold">${order.total}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader condensed>
                        <CardTitle className="flex items-center justify-between text-base">
                            <span>Order Timeline</span>
                            {![OrderStatus.Fullfilled, OrderStatus.Calcelled].includes(order.status as OrderStatus) && (
                                <Badge
                                    variant="warning"
                                    className="flex cursor-pointer items-center space-x-1"
                                    onClick={() => updateOrder({ id: order.id, status: OrderStatus.Calcelled })}
                                >
                                    <BanIcon size={12} /> <span>Cancel order</span>
                                </Badge>
                            )}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Timeline id={order.id} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
