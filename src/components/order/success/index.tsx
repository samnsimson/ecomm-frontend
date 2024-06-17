'use client';
import { Store } from '@/lib/types';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import { FC, HTMLAttributes, useEffect } from 'react';

interface OrderSuccessProps extends HTMLAttributes<HTMLDivElement> {
    orderId: string;
    paymentId: string;
}

export const OrderSuccess: FC<OrderSuccessProps> = ({ orderId, paymentId, ...props }) => {
    const router = useRouter();
    const { setOrderId, setPaymentId, setCartData, emptyCart } = useStore<Store>((state) => state);

    useEffect(() => {
        setOrderId(undefined);
        setPaymentId(undefined);
        setCartData(undefined);
        emptyCart();
        const timeout = setTimeout(() => router.push('/account/orders'), 2000);
        return () => clearTimeout(timeout);
    }, [emptyCart, router, setCartData, setOrderId, setPaymentId]);

    return (
        <div className="prose space-y-6 text-center" {...props}>
            <h1 className="my-0">Order placed successfully</h1>
            <h4 className="my-0">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum laudantium velit voluptate minus ab atque in voluptatum cupiditate, vel,
                nesciunt repellendus similique eos autem.
            </h4>
            <p className="my-0">Redirecting you in few seconds...</p>
        </div>
    );
};
