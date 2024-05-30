'use client';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CartProductsQuery, useCartProductsLazyQuery } from '@/graphql/generated';
import { useStore } from '@/store';
import { MinusIcon, PlusIcon, XIcon } from 'lucide-react';
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
    const { cart, addToCart, removeFromCart } = useStore((state) => state);
    const [cartItem, setCartItem] = useState<CartProductsQuery['cartProducts']>({ total: 0, products: [] });
    const [getCartProducts, { loading, error }] = useCartProductsLazyQuery();

    useEffect(() => {
        getCartProducts({ variables: { input: cart.map(({ id, quantity }) => ({ id, quantity })) } }).then(({ data }) => {
            console.log(data);
            if (data) setCartItem(data.cartProducts);
        });
    }, [cart, getCartProducts]);

    return (
        <Table {...props}>
            <TableCaption className="my-0 border-t border-border px-4 py-2 text-left">Discounts and coupons will be calculated at checkout</TableCaption>
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
                    <TableCell className="text-right font-semibold" colSpan={4}>
                        Total
                    </TableCell>
                    <TableCell className="text-right text-base font-semibold">${cartItem.total}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};