'use client';
import { DataTable } from '@/components/data-table';
import { Drawer } from '@/components/drawer';
import { ShippingForm } from '@/components/form/dashboard/shippings';
import { Switch } from '@/components/ui/switch';
import { Shipping, ShippingType, UpdateShippingInput } from '@/graphql/generated';
import { useShipping } from '@/providers/shipping.provider';
import { ColumnDef } from '@tanstack/react-table';
import { FC, HTMLAttributes, use } from 'react';

interface ShippingsListProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

type ShippingList = {
    id: string;
    title: string;
    description: string;
    type: ShippingType;
    amount: number;
    percentage: number;
    enabled: boolean;
};

const shippingData = (shippings: Array<Shipping>) => {
    return shippings.map(({ id, title, description, type, amount, percentage, enabled }) => ({ id, title, description, type, amount, percentage, enabled }));
};

const ShippingTitle: FC<{ data: ShippingList }> = ({ data }) => {
    return (
        <Drawer trigger={<p className="cursor-pointer font-semibold">{data.title}</p>} title="Update shipping" size="medium">
            <ShippingForm action="edit" id={data.id} />
        </Drawer>
    );
};

const shippingTypeValue = (data: ShippingList) => {
    switch (data.type) {
        case ShippingType.Flat:
            return `$${data.amount}`;
        case ShippingType.Percentage:
            return `${data.percentage}%`;
        case ShippingType.Free:
            return `$0`;
        default:
            break;
    }
};

const columnDefs = (update: (input: UpdateShippingInput) => Promise<void>): Array<ColumnDef<ShippingList>> => [
    {
        accessorKey: 'title',
        header: 'Title',
        cell: ({ row: { original } }) => <ShippingTitle data={original} />,
        meta: { columnClassName: 'hover:text-primary' },
    },
    { accessorKey: 'description', header: 'Description' },
    { accessorKey: 'type', header: 'Shipping Type' },
    { header: 'Value', cell: ({ row: { original } }) => shippingTypeValue(original), meta: { columnClassName: 'text-right' } },
    {
        header: 'Elabled',
        cell: ({ row: { original } }) => <Switch checked={original.enabled} onCheckedChange={(enabled) => update({ id: original.id, enabled })} />,
    },
];

export const ShippingsList: FC<ShippingsListProps> = ({ ...props }) => {
    const { shippings, update } = useShipping();

    return <DataTable data={shippingData(shippings)} columns={columnDefs(update)} />;
};
