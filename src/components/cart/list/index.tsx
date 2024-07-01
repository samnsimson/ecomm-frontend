'use client';
import { ApplyCouponForm } from '@/components/form/coupon/apply';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CartQuery, useCartLazyQuery } from '@/graphql/generated';
import { useStore } from '@/store';
import { MinusIcon, PlusIcon, XIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FC, HTMLAttributes, useEffect, useState } from 'react';

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
    const { data: session } = useSession();
    const { cart, addToCart, removeFromCart, setCartData } = useStore((state) => state);
    const [cartItem, setCartItem] = useState<CartQuery['cart']>({ total: 0, subTotal: 0, isDeductionsEligible: false, products: [] });
    const [couponCode, setCouponCode] = useState<string | null>(null);
    const [getCartProducts, { loading, error }] = useCartLazyQuery();

    useEffect(() => {
        const input = { products: cart.map(({ id, quantity }) => ({ id, quantity })), couponCode };
        getCartProducts({ variables: { input, userId: session?.user.id } }).then(({ data }) => {
            if (data) {
                setCartItem(data.cart);
                setCartData({
                    total: data.cart.total ?? 0,
                    subTotal: data.cart.subTotal ?? 0,
                    discountAmount: data.cart.discount ?? 0,
                    taxAmount: data.cart?.taxes?.total ?? 0,
                    couponAmount: data.cart.coupon ?? 0,
                    shippingAmount: 0,
                    cartItems: data.cart.products.map((pdt) => ({ id: pdt.id, price: pdt.salePrice, quantity: pdt.quantity, total: pdt.total })),
                });
            }
        });
    }, [cart, couponCode, session, getCartProducts, setCartData]);

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
            <TableBody>
                {cartItem.products.map((cart) => (
                    <TableRow key={cart.id}>
                        <TableCell onClick={() => removeFromCart(cart.id, cart.quantity)} className="group cursor-pointer">
                            <XIcon className="text-muted-foreground group-hover:text-destructive" size={18} />
                        </TableCell>
                        <TableCell className="font-medium">
                            <Link href={`/shop/${cart.slug}`} className="hover:text-primary">
                                {cart.title}
                            </Link>
                        </TableCell>
                        <TableCell className="text-right">${cart.salePrice}</TableCell>
                        <TableCell>
                            <CartQuantity quantity={cart.quantity} add={() => addToCart(cart.id, 1)} remove={() => removeFromCart(cart.id, 1)} />
                        </TableCell>
                        <TableCell className="text-right">${cart.total}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell className="py-4 align-top" colSpan={2} rowSpan={5}>
                        <ApplyCouponForm onCouponApply={({ code }) => setCouponCode(code)} />
                    </TableCell>
                    <TableCell className="py-2 text-right font-semibold" colSpan={2}>
                        Sub Total
                    </TableCell>
                    <TableCell className="py-2 text-right text-base font-semibold">${cartItem.subTotal}</TableCell>
                </TableRow>
                {!!cartItem['discount'] && (
                    <TableRow>
                        <TableCell className="py-2 text-right font-semibold" colSpan={2}>
                            Discount
                        </TableCell>
                        <TableCell className="py-2 text-right text-base font-semibold">- ${cartItem.discount}</TableCell>
                    </TableRow>
                )}
                {!!cartItem['coupon'] && (
                    <TableRow>
                        <TableCell className="py-2 text-right font-semibold" colSpan={2}>
                            Coupon
                        </TableCell>
                        <TableCell className="py-2 text-right text-base font-semibold">- ${cartItem.coupon}</TableCell>
                    </TableRow>
                )}
                {cartItem['taxes'] && (
                    <TableRow>
                        <TableCell className="py-2 text-right font-semibold" colSpan={2}>
                            Taxes
                        </TableCell>
                        <TableCell className="py-2 text-right text-base font-semibold">${cartItem.taxes.total}</TableCell>
                    </TableRow>
                )}
                <TableRow>
                    <TableCell className="py-2 text-right font-semibold" colSpan={2}>
                        Total
                    </TableCell>
                    <TableCell className="py-2 text-right text-base font-semibold">${cartItem.total}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};
