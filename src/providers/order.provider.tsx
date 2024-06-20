'use client';
import { GetOrderQuery, UpdateOrderInput, UpdateOrderMutation, useGetOrderLazyQuery, useUpdateOrderMutation } from '@/graphql/generated';
import { FetchResult } from '@apollo/client';
import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

type Order = GetOrderQuery['order'];

type OrderContextType = {
    order: Order;
    getOrder: (id: string) => Promise<void>;
    updateOrder: (data: UpdateOrderInput) => Promise<FetchResult<UpdateOrderMutation>>;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: FC<{ order: Order } & PropsWithChildren> = ({ order: initialOrder, children }) => {
    const [getOrderQuery, { refetch }] = useGetOrderLazyQuery();
    const [updateOrderMutation] = useUpdateOrderMutation({ onCompleted: (data) => refetchOrder(data.updateOrder.id) });
    const [order, setOrder] = useState<Order | undefined>(initialOrder);

    const refetchOrder = async (id: string) => {
        const { data } = await refetch({ id });
        if (data) setOrder(data.order);
    };

    const getOrder = async (id: string) => {
        const { data } = await getOrderQuery({ variables: { id } });
        if (data) setOrder(data.order);
    };

    const updateOrder = async (data: UpdateOrderInput) => {
        return await updateOrderMutation({ variables: { input: data } });
    };

    if (!order) return null;

    return <OrderContext.Provider value={{ order, getOrder, updateOrder }}>{children}</OrderContext.Provider>;
};

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) throw new Error('useOrder must be used within an OrderProvider');
    return context;
};
