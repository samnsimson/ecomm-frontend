'use client';
import { DataTable } from '@/components/data-table';
import { Discount, DiscountType } from '@/graphql/generated';
import { useDiscounts } from '@/providers/discount.provider';
import { ColumnDef } from '@tanstack/react-table';
import { DollarSign, PercentIcon } from 'lucide-react';
import { FC, HTMLAttributes } from 'react';

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

const columnDefs = (): ColumnDef<DiscountList>[] => {
    return [
        { accessorKey: 'title', header: 'Title' },
        { accessorKey: 'type', header: 'Type' },
        { header: 'Value', cell: ({ row: { original } }) => (original.type === DiscountType.Flat ? <DollarSign /> : <PercentIcon />) },
        { accessorKey: 'validFrom', header: 'Valid From' },
        { accessorKey: 'validThrough', header: 'Valid Through' },
        { header: 'Action' },
    ];
};

export const DiscountsList: FC<DiscountsListProps> = ({ ...props }) => {
    const { discounts } = useDiscounts();
    return <DataTable data={createData(discounts)} columns={columnDefs()} {...props} />;
};
