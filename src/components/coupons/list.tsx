'use client';
import { Coupon, CouponType, CouponUsageType } from '@/graphql/generated';
import { useCoupons } from '@/providers/coupon.provider';
import { ColumnDef } from '@tanstack/react-table';
import { FC, HTMLAttributes } from 'react';
import { DataTable } from '../data-table';

interface CouponsListProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

type CouponList = {
    title: string;
    code: string;
    description: string | null | undefined;
    type: CouponType;
    usageType: CouponUsageType;
    amount: number;
    percentage: number | null | undefined;
    lastUsedAt: Date;
    enabled: boolean;
};

const couponData = (coupons: Array<Coupon>): Array<CouponList> => {
    return coupons.map(({ id, title, code, description, type, usageType, amount, percentage, lastUsedAt, enabled }) => ({
        id,
        title,
        code,
        description,
        lastUsedAt,
        type: type as CouponType,
        usageType: usageType as CouponUsageType,
        amount: amount as number,
        percentage: percentage as number,
        enabled: enabled as boolean,
    }));
};

const columnDef: Array<ColumnDef<CouponList>> = [
    { accessorKey: 'title', header: 'Title' },
    { accessorKey: 'code', header: 'Code' },
    { accessorKey: 'type', header: 'Coupon Type' },
    { accessorKey: 'usageType', header: 'Usage Type' },
    { header: 'Value' },
    { accessorKey: 'usageType', header: 'Enabled' },
];

export const CouponsList: FC<CouponsListProps> = ({ ...props }) => {
    const { coupons } = useCoupons();
    return <DataTable columns={columnDef} data={couponData(coupons)} />;
};
