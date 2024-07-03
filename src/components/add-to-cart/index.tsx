'use client';
import { FC, HTMLAttributes, useEffect, useLayoutEffect, useState } from 'react';
import { Button, buttonVariants } from '../ui/button';
import { CheckCheckIcon, ShoppingCartIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';
import { useCart } from '@/providers/cart.provider';
import { useSession } from 'next-auth/react';
import { v4 as uuid } from 'uuid';

interface AddToCartProps extends HTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    product: { id: string; quantity: number; salePrice: number };
    fullWidth?: boolean;
}

export const AddToCart: FC<AddToCartProps> = ({ className, fullWidth, product, ...props }) => {
    const { data: session } = useSession();
    const { cart, createCart, createCartItem, removeCartItem } = useCart();
    const [item, setItem] = useState<any>(undefined);

    const handleAddToCart = async () => {
        if (!cart && !item) {
            const item = { id: product.id, price: product.salePrice, quantity: product.quantity };
            await createCart({ ...(session && { userId: session.user.id }), items: [item] });
        } else if (cart && !item) {
            await createCartItem({ cartId: cart.id, productId: product.id, price: product.salePrice, quantity: product.quantity });
        } else if (cart && item) {
            await removeCartItem({ itemId: item.id, cartId: cart.id });
        }
    };

    useLayoutEffect(() => {
        if (cart) setItem(cart.items.find((x) => x.product.id === product.id));
    }, [cart, product]);

    return (
        <div className={cn({ 'w-full': fullWidth })}>
            <Button
                variant={item ? 'secondary' : 'default'}
                startContent={item ? <CheckCheckIcon size={18} /> : <ShoppingCartIcon size={18} />}
                className={cn('w-full', className)}
                onClick={() => handleAddToCart()}
                {...props}
            >
                {item ? 'Item in cart' : 'Add to cart'}
            </Button>
        </div>
    );
};
