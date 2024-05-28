'use client';
import { FC, HTMLAttributes } from 'react';
import { Button, buttonVariants } from '../ui/button';
import { MinusIcon, PlusIcon, ShoppingCartIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';
import { useStore } from '@/store';
import { AddToCartProduct } from '@/lib/types';

interface AddToCartProps extends HTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    product: AddToCartProduct;
    fullWidth?: boolean;
}

export const AddToCart: FC<AddToCartProps> = ({ className, fullWidth, product, ...props }) => {
    const { cart, addToCart, removeFromCart } = useStore((state) => state);
    const item = cart.find((x) => x.id === product.id);

    return (
        <div className={cn({ 'w-full': fullWidth })}>
            {item ? (
                <div className="flex items-center justify-between">
                    <Button size="icon" className={cn('', className)} disabled={item.quantity < 1} onClick={() => removeFromCart({ ...product, quantity: 1 })}>
                        <MinusIcon />
                    </Button>
                    <div className="flex min-w-[60px] flex-1 items-center justify-center text-lg font-bold">{item.quantity}</div>
                    <Button size="icon" className={cn('', className)} onClick={() => addToCart({ ...product, quantity: 1 })}>
                        <PlusIcon />
                    </Button>
                </div>
            ) : (
                <Button
                    variant="default"
                    startContent={<ShoppingCartIcon size={18} />}
                    className={cn('w-full', className)}
                    {...props}
                    onClick={() => addToCart({ ...product, quantity: 1 })}
                >
                    Add to cart
                </Button>
            )}
        </div>
    );
};
