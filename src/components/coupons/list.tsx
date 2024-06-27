'use client';
import { Coupon, CouponType, CouponUsageType, UpdateCouponInput } from '@/graphql/generated';
import { useCoupons } from '@/providers/coupon.provider';
import { ColumnDef } from '@tanstack/react-table';
import { FC, HTMLAttributes } from 'react';
import { DataTable } from '../data-table';
import { localDate } from '@/lib/helpers';
import { Switch } from '../ui/switch';
import { DollarSignIcon, PercentIcon } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Drawer } from '../drawer';
import { CouponForm } from '../form/coupon';

interface CouponsListProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

type CouponList = {
    id: string;
    title: string;
    code: string;
    description: string | null | undefined;
    type: CouponType;
    usageType: CouponUsageType;
    amount: number;
    percentage: number | null | undefined;
    lastUsedAt: string;
    enabled: boolean;
    validFrom: string;
    validThrough: string;
};

const couponData = (coupons: Array<Coupon>): Array<CouponList> => {
    return coupons.map(({ id, title, code, description, type, usageType, amount, percentage, lastUsedAt, validFrom, validThrough, enabled }) => ({
        id,
        title,
        code,
        description,
        lastUsedAt: localDate(lastUsedAt),
        type: type as CouponType,
        usageType: usageType as CouponUsageType,
        amount: amount as number,
        percentage: percentage as number,
        enabled: enabled as boolean,
        validFrom: localDate(validFrom),
        validThrough: localDate(validThrough),
    }));
};

const columnDef = (update: (input: UpdateCouponInput) => Promise<void>): Array<ColumnDef<CouponList>> => [
    { accessorKey: 'title', header: 'Title' },
    { accessorKey: 'code', header: 'Code' },
    {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ row: { original } }) => (original.type === CouponType.Flat ? <DollarSignIcon size={16} /> : <PercentIcon size={16} />),
    },
    { header: 'Value', cell: ({ row: { original } }) => (original.type === CouponType.Flat ? `$${original.amount}` : `${original.percentage}%`) },
    { accessorKey: 'usageType', header: 'Usage' },
    { accessorKey: 'validFrom', header: 'Valid From' },
    { accessorKey: 'validThrough', header: 'Valid Till' },
    { accessorKey: 'lastUsedAt', header: 'Last Used' },
    { accessorKey: 'enabled', header: 'Action', cell: ({ row: { original } }) => <ColumnAction data={original} update={update} /> },
];

const ColumnAction: FC<{ data: CouponList; update: (input: UpdateCouponInput) => Promise<void> }> = ({ data, update }) => {
    return (
        <div className="flex items-center space-x-4">
            <Drawer
                title="Update coupon"
                description="Update your store coupons"
                trigger={
                    <Badge variant="secondary" className="cursor-pointer">
                        Edit
                    </Badge>
                }
                size="medium"
            >
                <CouponForm action="edit" id={data.id} />
            </Drawer>

            <Switch checked={data.enabled} onCheckedChange={(enabled) => update({ id: data.id, enabled })} />
        </div>
    );
};

export const CouponsList: FC<CouponsListProps> = ({ ...props }) => {
    const { coupons, update } = useCoupons();
    return <DataTable columns={columnDef(update)} data={couponData(coupons)} />;
};
