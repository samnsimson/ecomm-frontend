'use client';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableFooter, TableRow } from '@/components/ui/table';
import { Store } from '@/lib/types';
import { useStore } from '@/store';
import { FC, HTMLAttributes } from 'react';

interface OrderPreviewProps extends HTMLAttributes<HTMLTableElement> {
    [x: string]: any;
}

export const OrderPreview: FC<OrderPreviewProps> = ({ ...props }) => {
    const { cartData } = useStore<Store>((state) => state);
    return (
        <div>
            <Table {...props}>
                <TableBody>
                    <TableRow>
                        <TableCell>Sub total</TableCell>
                        <TableCell className="text-right font-semibold">${cartData?.subTotal}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Tax</TableCell>
                        <TableCell className="text-right font-semibold">${cartData?.taxAmount}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Shipping</TableCell>
                        <TableCell className="text-right font-semibold">${cartData?.shippingAmount}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Discount</TableCell>
                        <TableCell className="text-right font-semibold">${cartData?.discountAmount}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Coupon</TableCell>
                        <TableCell className="text-right font-semibold">${cartData?.couponAmount}</TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter className="bg-primary">
                    <TableRow className="prose">
                        <TableCell className="text-primary-foreground">Total</TableCell>
                        <TableCell className="text-right font-semibold text-primary-foreground">${cartData?.total}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};
