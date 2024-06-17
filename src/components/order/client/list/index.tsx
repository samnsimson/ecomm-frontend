'use client';
import { DataTable } from '@/components/data-table';
import { GetOrdersQuery } from '@/graphql/generated';
import { FC, HTMLAttributes } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { BoxIcon, CheckCircle, Clock, ExternalLinkIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { localTime, relativeTime } from '@/lib/helpers';
import Link from 'next/link';

interface ListOrdersProps extends HTMLAttributes<HTMLDivElement> {
    orders: GetOrdersQuery['orders'];
}

type ItemList = {
    title: string;
    price: string;
    quantity: number;
    total: string;
    slug: string;
};

const itemsList = (items: ListOrdersProps['orders'][0]['items']): Array<ItemList> => {
    return items.map((item) => ({
        title: item.product.title,
        price: `$${item.price}`,
        quantity: item.quantity,
        total: `$${item.total}`,
        slug: item.product.slug as string,
    }));
};

const columns = (): ColumnDef<ItemList>[] => {
    return [
        {
            accessorKey: 'title',
            header: 'Product',
            cell: ({ row }) => (
                <Link href={`/shop/${row.original.slug}`} className="flex items-center space-x-2 font-semibold hover:text-primary">
                    <BoxIcon size={16} className="text-primary" />
                    <span>{row.original.title}</span>
                    <ExternalLinkIcon size={16} />
                </Link>
            ),
        },
        { accessorKey: 'price', header: 'Price', size: 100 },
        { accessorKey: 'quantity', header: 'Quantity', size: 100 },
        { accessorKey: 'total', header: 'Total', size: 100 },
    ];
};

export const ListOrders: FC<ListOrdersProps> = ({ orders, ...props }) => {
    return (
        <Accordion type="single" collapsible>
            {orders.map((order) => (
                <AccordionItem key={order.id} value={order.id} className="divide-y rounded bg-white">
                    <AccordionTrigger className="w-full px-6 py-4 hover:no-underline">
                        <div className="flex flex-1 justify-between">
                            <p>
                                Order ID: <span className="text-muted-foreground">{order.id}</span>
                            </p>
                            <div className="flex space-x-3">
                                <Badge variant="secondary" className="space-x-2">
                                    <Clock size={13} /> <span>{relativeTime(order.createdAt)}</span>
                                </Badge>
                                <Badge className="space-x-2">
                                    <CheckCircle size={13} />
                                    <span>{order.status}</span>
                                </Badge>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-0">
                        <Table className="mb-2">
                            <TableHeader>
                                <TableRow className="bg-muted">
                                    <TableHead colSpan={4}>Order info</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow className="border-0">
                                    <TableCell className="w-[25%] py-1 font-semibold">Tax</TableCell>
                                    <TableCell className="w-[25%] py-1">${order.taxAmount}</TableCell>
                                    <TableCell className="w-[25%] py-1 font-semibold">Subtotal</TableCell>
                                    <TableCell className="w-[25%] py-1">${order.subTotal}</TableCell>
                                </TableRow>
                                <TableRow className="border-0">
                                    <TableCell className="w-[25%] py-1 font-semibold">Shipping</TableCell>
                                    <TableCell className="w-[25%] py-1">${order.shippingAmount}</TableCell>
                                    <TableCell className="w-[25%] py-1 font-semibold">Total</TableCell>
                                    <TableCell className="w-[25%] py-1">${order.total}</TableCell>
                                </TableRow>
                                <TableRow className="border-0">
                                    <TableCell className="w-[25%] py-1 font-semibold">Discount</TableCell>
                                    <TableCell className="w-[25%] py-1">${order.discountAmount}</TableCell>
                                    <TableCell className="w-[25%] py-1 font-semibold">Placed At</TableCell>
                                    <TableCell className="w-[25%] py-1">{localTime(order.createdAt)}</TableCell>
                                </TableRow>
                                <TableRow className="border-0">
                                    <TableCell className="w-[25%] py-1 font-semibold">Coupon</TableCell>
                                    <TableCell className="w-[25%] py-1">${order.couponAmount}</TableCell>
                                    <TableCell className="w-[25%] py-1 font-semibold">Payment status</TableCell>
                                    <TableCell className="w-[25%] py-1">
                                        <Badge variant="secondary">{order.payment.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <DataTable columns={columns()} data={itemsList(order.items)} />
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};
