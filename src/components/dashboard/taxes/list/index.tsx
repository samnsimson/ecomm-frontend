'use client';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useTaxes } from '@/providers/tax.provider';
import { FC, HTMLAttributes } from 'react';

interface TaxListProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const TaxList: FC<TaxListProps> = ({ ...props }) => {
    const { taxes, updateTax } = useTaxes();
    return (
        <div {...props} className="flex flex-col divide-y">
            {taxes.map((tax) => (
                <div key={tax.id} className="flex items-center justify-between px-6 py-3">
                    <div className="prose flex flex-col space-y-0.5">
                        <h4 className="my-0">{tax.title}</h4>
                        <p className="my-0 leading-tight">{tax.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" onClick={() => {}}>
                            Edit
                        </Button>
                        <Switch checked={!!tax.enabled} onCheckedChange={() => updateTax({ id: tax.id, enabled: !tax.enabled })} />
                    </div>
                </div>
            ))}
        </div>
    );
};
