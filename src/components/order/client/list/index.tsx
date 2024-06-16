import { GetOrdersQuery, OrderStatus } from '@/graphql/generated';
import { FC, HTMLAttributes } from 'react';

interface ListOrdersProps extends HTMLAttributes<HTMLDivElement> {
    orders: GetOrdersQuery['orders'];
}

type OrderList = {
    id: string;
    status: OrderStatus;
    createdAt: Date;
};

const orderList = (orders: ListOrdersProps['orders']): Array<OrderList> => {
    return orders.map((order) => ({
        id: order.id,
        status: order.status as OrderStatus,
        createdAt: order.createdAt,
    }));
};

export const ListOrders: FC<ListOrdersProps> = ({ orders, ...props }) => {
    return <div {...props}>ListOrders</div>;
};
