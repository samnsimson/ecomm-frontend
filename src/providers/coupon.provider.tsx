'use client';
import { Coupon, CreateCouponInput, useCreateCouponMutation, useGetCouponsLazyQuery } from '@/graphql/generated';
import { FC, PropsWithChildren, createContext, useContext, useState } from 'react';
import { toast } from 'sonner';

type CouponContext = {
    coupons: Array<Coupon>;
    loading: boolean;
    create: (input: CreateCouponInput) => Promise<void>;
};

export const CouponContext = createContext<CouponContext>({
    coupons: [],
    loading: false,
    create: async () => {},
});

export const CouponProvider: FC<PropsWithChildren & { initialCoupons: Array<Coupon> }> = ({ children, initialCoupons = [] }) => {
    const [getCoupons, { refetch }] = useGetCouponsLazyQuery();
    const [createCoupon] = useCreateCouponMutation();
    const [loading, setLoading] = useState(false);
    const [coupons, setCoupons] = useState<Array<Coupon>>(initialCoupons);

    const create = async (input: CreateCouponInput) => {
        try {
            setLoading(true);
            const { errors } = await createCoupon({ variables: { input } });
            if (errors) throw new Error(JSON.stringify(errors));
            const { data } = await refetch();
            setCoupons(data.coupons);
            toast.success('Coupon Created', { description: `Coupon code "${input.code}" created successfully` });
        } catch (error) {
            console.log('🚀 ~ create ~ error:', error);
            toast.error('Error creating coupon');
        } finally {
            setLoading(false);
        }
    };

    return <CouponContext.Provider value={{ coupons, loading, create }}>{children}</CouponContext.Provider>;
};

export const useCoupons = () => useContext(CouponContext);
