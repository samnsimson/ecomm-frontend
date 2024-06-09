'use client';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Shipping } from '@/graphql/generated';
import { useShipping } from '@/providers/shipping.provider';
import { FC, HTMLAttributes, use } from 'react';

interface ShippingsListProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

const shippingValue = (shipping: Omit<Shipping, 'createdAt' | 'updatedAt'>) => {
    switch (shipping.type) {
        case 'FREE':
            return <span>(FREE)</span>;
        case 'FLAT':
            return <span>(${shipping.amount})</span>;
        case 'PERCENTAGE':
            return <span>({shipping.percentage}%)</span>;
        default:
            break;
    }
};

export const ShippingsList: FC<ShippingsListProps> = ({ ...props }) => {
    const { shippings, update, setContext } = useShipping();

    return (
        <div {...props} className="flex flex-col divide-y">
            {shippings.map((shipping) => (
                <div key={shipping.id} className="flex items-center justify-between px-6 py-3">
                    <div className="prose flex flex-col space-y-0.5">
                        <h4 className="my-0">
                            {shipping.title} {shippingValue(shipping)}
                        </h4>
                        <p className="my-0 leading-tight">{shipping.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" onClick={() => setContext(shippings.find((x) => x.id === shipping.id))}>
                            Edit
                        </Button>
                        <Switch checked={shipping.enabled} onCheckedChange={() => update(shipping.id, { enabled: !shipping.enabled })} />
                    </div>
                </div>
            ))}
        </div>
    );
};
