'use client';
import { DataTable } from '@/components/data-table';
import { Drawer } from '@/components/drawer';
import { TaxesForm } from '@/components/form/dashboard/taxes';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tax, TaxTypes, UpdateTaxInput } from '@/graphql/generated';
import { useTaxes } from '@/providers/tax.provider';
import { ColumnDef } from '@tanstack/react-table';
import { DollarSignIcon, PercentIcon } from 'lucide-react';
import { FC, HTMLAttributes } from 'react';

interface TaxListProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

type TaxList = Omit<Tax, 'createdAt' | 'updatedAt' | '__typename'>;
type RowActionProps = { data: TaxList; update: (data: UpdateTaxInput) => Promise<void> };

const taxData = (taxes: Tax[]) => taxes.map(({ createdAt, updatedAt, ...rest }) => rest);
const columnDefs = (update: (input: UpdateTaxInput) => Promise<void>): Array<ColumnDef<TaxList>> => [
    { accessorKey: 'title', header: 'Title', meta: { columnClassName: 'font-semibold' } },
    {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ row: { original } }) => (original.type === TaxTypes.Flat ? <DollarSignIcon size={16} /> : <PercentIcon size={16} />),
    },
    { header: 'Value', cell: ({ row: { original } }) => (original.type === TaxTypes.Flat ? `$${original.amount}` : `${original.percentage}%`) },
    { header: 'Action', cell: ({ row: { original } }) => <RowAction data={original} update={update} /> },
];

const RowAction: FC<RowActionProps> = ({ data, update }) => (
    <div className="flex items-center space-x-4">
        <Drawer title="Update Taxes" description="update your taxes here" size="medium" trigger={<Badge variant="secondary">Edit</Badge>}>
            <TaxesForm action="update" id={data.id} />
        </Drawer>
        <Switch checked={!!data.enabled} onCheckedChange={(enabled) => update({ id: data.id, enabled })} />
    </div>
);

export const TaxList: FC<TaxListProps> = ({ ...props }) => {
    const { taxes, update } = useTaxes();
    return <DataTable data={taxData(taxes)} columns={columnDefs(update)} {...props} />;
};
