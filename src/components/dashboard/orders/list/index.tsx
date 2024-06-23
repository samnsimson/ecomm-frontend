'use client';
import { DataTable } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { GetOrdersQuery, OrderStatus } from '@/graphql/generated';
import { localTime } from '@/lib/helpers';
import { ColumnDef } from '@tanstack/react-table';
import { ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';
import { OrderStatusBadge } from '../status-badge';

interface indexProps extends HTMLAttributes<HTMLDivElement> {
    orders: GetOrdersQuery['orders'];
}

type OrderList = {
    id: string;
    createdAt: string;
    status: string;
    total: number;
};

const orderList = (orders: GetOrdersQuery['orders']): Array<OrderList> => {
    return orders.map(({ id, status, total, createdAt }) => ({ id, status: status as string, total, createdAt }));
};

const OrderTitleRow: FC<{ id: string }> = ({ id }) => {
    return (
        <Link href={`/dashboard/orders/${id}`} className="flex items-center space-x-2 hover:text-primary">
            <span>{id}</span>
            <ExternalLinkIcon size={16} />
        </Link>
    );
};

const columnDefs: Array<ColumnDef<OrderList>> = [
    { accessorKey: 'id', header: 'Order Id', cell: ({ row }) => <OrderTitleRow id={row.original.id} /> },
    { accessorKey: 'total', header: 'Order Total', cell: ({ row }) => `$${row.original.total}` },
    { accessorKey: 'createdAt', header: 'Created At', cell: ({ row }) => <span suppressHydrationWarning>{localTime(row.original.createdAt)}</span> },
    { accessorKey: 'status', header: 'Order Status', cell: ({ row }) => <OrderStatusBadge status={row.original.status as OrderStatus} /> },
];

export const ListOrders: FC<indexProps> = ({ orders, ...props }) => {
    return <DataTable columns={columnDefs} data={orderList(orders)} />;
};
