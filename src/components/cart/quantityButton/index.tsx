'use client';
import { Button } from '@/components/ui/button';
import { useCart } from '@/providers/cart.provider';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { FC, HTMLAttributes, useLayoutEffect, useState } from 'react';

interface CartQuantityProps extends HTMLAttributes<HTMLDivElement> {
    productId: string;
    quantity: number;
    itemId: string;
    price: number;
}

export const CartQuantity: FC<CartQuantityProps> = ({ productId, itemId, price, quantity: qty = 0, ...props }) => {
    const { cart, updateCartItem, removeCartItem } = useCart();
    const [quantity, setQuantity] = useState<number>(qty);

    const incrementQuantity = async () => await updateCartItem({ itemId, cartId: cart!.id, quantity: quantity + 1, price });

    const decrementQuantity = async () => {
        if (quantity === 1) await removeCartItem({ itemId, cartId: cart!.id });
        else await updateCartItem({ itemId, cartId: cart!.id, quantity: quantity - 1, price });
    };

    useLayoutEffect(() => {
        if (cart) {
            const item = cart.items.find((x) => x.product.id === productId);
            if (item) setQuantity(item.quantity);
        }
    }, [cart, productId]);

    return (
        <div className="flex items-center justify-between" {...props}>
            <Button size="icon" variant="secondary" className="h-6 w-6 p-0" onClick={() => decrementQuantity()}>
                <MinusIcon size={18} />
            </Button>
            <div className="flex-1 text-center">
                <p className="my-0">{quantity}</p>
            </div>
            <Button size="icon" variant="secondary" className="h-6 w-6 p-0" onClick={() => incrementQuantity()}>
                <PlusIcon size={18} />
            </Button>
        </div>
    );
};
