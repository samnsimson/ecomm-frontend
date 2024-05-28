'use client';
import { List, ListItem } from '@/components/list';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useStore } from '@/store';
import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';

interface CartListProps extends HTMLAttributes<HTMLTableElement> {
    [x: string]: any;
}

export const CartList: FC<CartListProps> = ({ ...props }) => {
    const { cart } = useStore((state) => state);
    return (
        <Table {...props}>
            <TableHeader className="bg-muted">
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="w-[100px]">Price</TableHead>
                    <TableHead className="w-[100px]">Quantity</TableHead>
                    <TableHead className="w-[100px] text-right">Subtotal</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {cart.map((cart) => (
                    <TableRow key={cart.id}>
                        <TableCell className="font-medium">
                            <Link href={`/shop/${cart.slug}`} className="hover:text-primary">
                                {cart.title}
                            </Link>
                        </TableCell>
                        <TableCell className="text-right">${Math.abs(cart.salePrice / cart.quantity)}</TableCell>
                        <TableCell className="text-right">{cart.quantity}</TableCell>
                        <TableCell className="text-right">${cart.salePrice}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell className="text-right font-semibold" colSpan={3}>
                        Total
                    </TableCell>
                    <TableCell className="text-right text-base font-semibold">${cart.reduce((a, b) => a + b.salePrice, 0)}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};
