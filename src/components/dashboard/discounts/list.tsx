'use client';
import { DataTable } from '@/components/data-table';
import { Discount, DiscountType, UpdateDiscountInput } from '@/graphql/generated';
import { useDiscounts } from '@/providers/discount.provider';
import { ColumnDef } from '@tanstack/react-table';
import { DollarSign, PercentIcon } from 'lucide-react';
import { FC, HTMLAttributes } from 'react';
import { format } from 'date-fns';
import { Drawer } from '@/components/drawer';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { DiscountForm } from '@/components/form/discount';
import { localDate } from '@/lib/helpers';

interface DiscountsListProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

type DiscountList = {
    id: string;
    title: string;
    description: string;
    type: DiscountType;
    amount: number;
    percentage: number;
    validFrom: number;
    validThrough: number;
    enabled: boolean;
};

const createData = (discounts: Discount[]): DiscountList[] => {
    return discounts.map((discount) => ({
        id: discount.id,
        title: discount.title,
        description: discount.description ?? '-',
        type: discount.type,
        amount: discount.amount ?? 0,
        percentage: discount.percentage ?? 0,
        validFrom: discount.validFrom,
        validThrough: discount.validThrough,
        enabled: discount.enabled as boolean,
    }));
};

const columnDefs = (update: (input: UpdateDiscountInput) => Promise<void>): ColumnDef<DiscountList>[] => {
    return [
        { accessorKey: 'title', header: 'Title' },
        {
            accessorKey: 'type',
            header: 'Type',
            cell: ({ row: { original } }) => (original.type === DiscountType.Flat ? <DollarSign size={16} /> : <PercentIcon size={16} />),
        },
        { header: 'Value', cell: ({ row: { original } }) => (original.type === DiscountType.Flat ? `$${original.amount}` : `${original.percentage}%`) },
        { accessorKey: 'validFrom', header: 'Valid From', cell: ({ row: { original } }) => localDate(original.validFrom) },
        { accessorKey: 'validThrough', header: 'Valid Through', cell: ({ row: { original } }) => localDate(original.validThrough) },
        { header: 'Action', cell: ({ row: { original } }) => <ActionButton data={original} update={update} /> },
    ];
};

const ActionButton: FC<{ data: DiscountList; update: (input: UpdateDiscountInput) => Promise<void> }> = ({ data, update }) => {
    return (
        <div className="flex items-center space-x-4">
            <Drawer title="Update Discount" description="Update discount from store" size="medium" trigger={<Badge variant="secondary">Edit</Badge>}>
                <DiscountForm action="update" id={data.id} />
            </Drawer>
            <Switch checked={data.enabled} onCheckedChange={(enabled) => update({ id: data.id, enabled })} />
        </div>
    );
};

export const DiscountsList: FC<DiscountsListProps> = ({ ...props }) => {
    const { discounts, update } = useDiscounts();
    return <DataTable data={createData(discounts)} columns={columnDefs(update)} {...props} />;
};
