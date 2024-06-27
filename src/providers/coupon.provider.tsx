'use client';
import { Coupon, CreateCouponInput, UpdateCouponInput, useCreateCouponMutation, useGetCouponsLazyQuery, useUpdateCouponMutation } from '@/graphql/generated';
import { FC, PropsWithChildren, createContext, useContext, useState } from 'react';
import { toast } from 'sonner';

type CouponContext = {
    coupons: Array<Coupon>;
    loading: boolean;
    create: (input: CreateCouponInput) => Promise<void>;
    update: (input: UpdateCouponInput) => Promise<void>;
};

export const CouponContext = createContext<CouponContext>({
    coupons: [],
    loading: false,
    create: async () => {},
    update: async () => {},
});

export const CouponProvider: FC<PropsWithChildren & { initialCoupons: Array<Coupon> }> = ({ children, initialCoupons = [] }) => {
    const [getCoupons, { refetch }] = useGetCouponsLazyQuery();
    const [createCoupon] = useCreateCouponMutation();
    const [updateCoupon] = useUpdateCouponMutation();
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

    const update = async (input: UpdateCouponInput) => {
        try {
            setLoading(true);
            const { errors } = await updateCoupon({ variables: { input } });
            if (errors) throw new Error(JSON.stringify(errors));
            const { data } = await refetch();
            setCoupons(data.coupons);
            toast.success('Coupon Updated', { description: `Coupon code updated successfully` });
        } catch (error) {
            console.log('🚀 ~ create ~ error:', error);
            toast.error('Error creating coupon');
        } finally {
            setLoading(false);
        }
    };

    return <CouponContext.Provider value={{ coupons, loading, create, update }}>{children}</CouponContext.Provider>;
};

export const useCoupons = () => useContext(CouponContext);
