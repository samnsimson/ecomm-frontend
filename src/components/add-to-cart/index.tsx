'use client';
import { FC, HTMLAttributes } from 'react';
import { Button, buttonVariants } from '../ui/button';
import { CheckCheckIcon, ShoppingCartIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';
import { useStore } from '@/store';

interface AddToCartProps extends HTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    product: { id: string; quantity: number };
    fullWidth?: boolean;
}

export const AddToCart: FC<AddToCartProps> = ({ className, fullWidth, product, ...props }) => {
    const { cart, addToCart, removeFromCart } = useStore((state) => state);
    const item = cart.find((x) => x.id === product.id);

    return (
        <div className={cn({ 'w-full': fullWidth })}>
            <Button
                variant={item ? 'secondary' : 'default'}
                startContent={item ? <CheckCheckIcon size={18} /> : <ShoppingCartIcon size={18} />}
                className={cn('w-full', className)}
                onClick={() => (item ? removeFromCart(product.id, 1) : addToCart(product.id, 1))}
                {...props}
            >
                {item ? 'Item in cart' : 'Add to cart'}
            </Button>
        </div>
    );
};
