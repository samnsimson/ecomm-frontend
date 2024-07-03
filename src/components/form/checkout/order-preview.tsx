'use client';
import { Table, TableBody, TableCell, TableFooter, TableRow } from '@/components/ui/table';
import { useCart } from '@/providers/cart.provider';
import { MinusIcon } from 'lucide-react';
import { FC, HTMLAttributes } from 'react';

interface OrderPreviewProps extends HTMLAttributes<HTMLTableElement> {
    [x: string]: any;
}

export const OrderPreview: FC<OrderPreviewProps> = ({ ...props }) => {
    const { cart } = useCart();
    return (
        cart && (
            <Table {...props}>
                <TableBody>
                    <TableRow>
                        <TableCell>Sub total</TableCell>
                        <TableCell className="text-right font-semibold">${cart.subTotal}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Tax</TableCell>
                        <TableCell className="text-right font-semibold">${cart.taxAmount}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Shipping</TableCell>
                        <TableCell className="text-right font-semibold">${cart.shippingAmount}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="flex items-center">
                            Discount ( <MinusIcon size={14} /> )
                        </TableCell>
                        <TableCell className="text-right font-semibold">${cart.discountAmount}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="flex items-center">
                            Coupon ( <MinusIcon size={14} /> )
                        </TableCell>
                        <TableCell className="text-right font-semibold">${cart.couponAmount}</TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter className="bg-primary">
                    <TableRow className="prose">
                        <TableCell className="text-primary-foreground">Total</TableCell>
                        <TableCell className="text-right font-semibold text-primary-foreground">${cart.total}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        )
    );
};
