import { Badge } from '@/components/ui/badge';
import { OrderStatus } from '@/graphql/generated';
import { FC } from 'react';

export const OrderStatusBadge: FC<{ status: OrderStatus }> = ({ status }) => {
    const badgeVariant = (status: OrderStatus) => {
        if (status === OrderStatus.Fullfilled) return 'success';
        if (status === OrderStatus.Calcelled) return 'warning';
        return 'default';
    };
    return <Badge variant={badgeVariant(status)}>{status}</Badge>;
};
