'use client';
import { FC, HTMLAttributes, useMemo } from 'react';
import { Button, buttonVariants } from '../ui/button';
import { MinusIcon, PlusIcon, ShoppingCartIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';
import { useStore } from '@/store';

interface AddToCartProps extends HTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    id: string;
    price: number;
    fullWidth?: boolean;
}

export const AddToCart: FC<AddToCartProps> = ({ className, fullWidth, id, price, ...props }) => {
    const { cart, addToCart, removeFromCart } = useStore((state) => state);
    const item = cart.find((x) => x.id === id);

    return (
        <div className={cn({ 'w-full': fullWidth })}>
            {item ? (
                <div className="flex items-center justify-between">
                    <Button size="icon" className={cn('', className)} disabled={item.quantity < 1} onClick={() => removeFromCart({ id, quantity: 1, price })}>
                        <MinusIcon />
                    </Button>
                    <div className="flex min-w-[60px] flex-1 items-center justify-center text-lg font-bold">{item.quantity}</div>
                    <Button size="icon" className={cn('', className)} onClick={() => addToCart({ id, quantity: 1, price })}>
                        <PlusIcon />
                    </Button>
                </div>
            ) : (
                <Button
                    variant="default"
                    startContent={<ShoppingCartIcon size={18} />}
                    className={cn('w-full', className)}
                    {...props}
                    onClick={() => addToCart({ id, quantity: 1, price })}
                >
                    Add to cart
                </Button>
            )}
        </div>
    );
};
