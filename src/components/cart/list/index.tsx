'use client';
import { ApplyCouponForm } from '@/components/form/coupon/apply';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCart } from '@/providers/cart.provider';
import { MinusIcon, PlusIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';

interface CartListProps extends HTMLAttributes<HTMLTableElement> {
    [x: string]: any;
}

const CartQuantity: FC<{ quantity: number; add: () => void; remove: () => void }> = ({ quantity, add, remove }) => {
    return (
        <div className="flex items-center justify-between">
            <div className="rounded bg-secondary p-1" onClick={remove}>
                <MinusIcon size={18} />
            </div>
            <div className="flex-1 text-center">
                <p className="my-0">{quantity}</p>
            </div>
            <div className="rounded bg-secondary p-1" onClick={add}>
                <PlusIcon size={18} />
            </div>
        </div>
    );
};

export const CartList: FC<CartListProps> = ({ ...props }) => {
    const { cart, updateCartItem, removeCartItem } = useCart();
    return (
        <Table {...props}>
            <TableHeader className="bg-muted">
                <TableRow>
                    <TableHead className="w-[40px]"></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="w-[100px] text-right">Price</TableHead>
                    <TableHead className="w-[140px] text-right">Quantity</TableHead>
                    <TableHead className="w-[100px] text-right">Subtotal</TableHead>
                </TableRow>
            </TableHeader>
            {!!cart && (
                <TableBody>
                    {cart.items.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell onClick={() => removeCartItem({ cartId: cart.id, itemId: item.id })} className="group cursor-pointer">
                                <XIcon className="text-muted-foreground group-hover:text-destructive" size={18} />
                            </TableCell>
                            <TableCell className="font-medium">
                                <Link href={`/shop/${item.product.slug}`} className="hover:text-primary">
                                    {item.product.title}
                                </Link>
                            </TableCell>
                            <TableCell className="text-right">${item.product.salePrice}</TableCell>
                            <TableCell>
                                <CartQuantity
                                    quantity={item.quantity}
                                    add={() => updateCartItem({ cartId: cart.id, itemId: item.id, quantity: item.quantity + 1 })}
                                    remove={() => removeCartItem({ itemId: item.id, cartId: cart.id })}
                                />
                            </TableCell>
                            <TableCell className="text-right">${item.total}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            )}
            {!!cart && (
                <TableFooter>
                    <TableRow>
                        <TableCell className="py-4 align-top" colSpan={2} rowSpan={5}>
                            <ApplyCouponForm appliedCoupon={cart.coupon} onCouponApply={() => {}} />
                        </TableCell>
                        <TableCell className="py-2 text-right font-semibold" colSpan={2}>
                            Sub Total
                        </TableCell>
                        <TableCell className="py-2 text-right text-base font-semibold">${cart.subTotal}</TableCell>
                    </TableRow>
                    {!!cart['discountAmount'] && (
                        <TableRow>
                            <TableCell className="py-2 text-right font-semibold" colSpan={2}>
                                Discount
                            </TableCell>
                            <TableCell className="py-2 text-right text-base font-semibold">- ${cart.discountAmount}</TableCell>
                        </TableRow>
                    )}
                    {!!cart['couponAmount'] && (
                        <TableRow>
                            <TableCell className="py-2 text-right font-semibold" colSpan={2}>
                                Coupon
                            </TableCell>
                            <TableCell className="py-2 text-right text-base font-semibold">- ${cart.couponAmount}</TableCell>
                        </TableRow>
                    )}
                    {!!cart['taxAmount'] && (
                        <TableRow>
                            <TableCell className="py-2 text-right font-semibold" colSpan={2}>
                                Taxes
                            </TableCell>
                            <TableCell className="py-2 text-right text-base font-semibold">${cart.taxAmount}</TableCell>
                        </TableRow>
                    )}

                    <TableRow>
                        <TableCell className="py-2 text-right font-semibold" colSpan={2}>
                            Total
                        </TableCell>
                        <TableCell className="py-2 text-right text-base font-semibold">${cart.total}</TableCell>
                    </TableRow>
                </TableFooter>
            )}
        </Table>
    );
};
