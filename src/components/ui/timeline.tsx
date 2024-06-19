'use client';
import { localTime } from '@/lib/helpers';
import { CheckIcon, ClockIcon } from 'lucide-react';
import { FC, HTMLAttributes } from 'react';
import { Button } from './button';
import { GetOrderDocument, OrderStatus, useUpdateOrderMutation } from '@/graphql/generated';
import { toast } from 'sonner';

interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
    id: string;
    createdAt: string | null | undefined;
    udpatedAt: string | null | undefined;
    processedAt: string | null | undefined;
    fulfilledAt: string | null | undefined;
    shippedAt: string | null | undefined;
    cancelledAt: string | null | undefined;
    refundedAt: string | null | undefined;
}

export const Timeline: FC<TimelineProps> = ({ id, createdAt, udpatedAt, processedAt, fulfilledAt, shippedAt, cancelledAt, refundedAt, ...props }) => {
    const [updateOrder] = useUpdateOrderMutation({ refetchQueries: [{ query: GetOrderDocument, variables: { id } }] });

    const processOrder = async () => {
        const { errors } = await updateOrder({ variables: { input: { id, status: OrderStatus.Processing } } });
        if (errors) toast.error('Failed to process order');
        else toast.success('Order status changed to processing');
    };

    return (
        <ol className="relative flex flex-col space-y-6 border-s border-primary dark:border-primary" {...props}>
            {createdAt && (
                <li className="ms-6">
                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-8 ring-white dark:bg-primary dark:ring-gray-900">
                        <ClockIcon size={16} className="text-background" />
                    </span>
                    <time className="mb-1 text-base font-normal leading-none text-secondary-foreground dark:text-gray-500">{localTime(createdAt)}</time>
                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground">New order placed.</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, repellendus?</p>
                    <Button
                        size="sm"
                        className="mt-3"
                        variant={processedAt ? 'secondary' : 'default'}
                        startContent={processedAt ? <CheckIcon /> : null}
                        disabled={!!processedAt}
                        onClick={() => processOrder()}
                    >
                        {processedAt ? 'Order Processed' : 'Process Order'}
                    </Button>
                </li>
            )}
            {processedAt && (
                <li className="ms-6">
                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-8 ring-white dark:bg-primary dark:ring-gray-900">
                        <ClockIcon size={16} className="text-background" />
                    </span>
                    <time className="mb-1 text-base font-normal leading-none text-secondary-foreground dark:text-gray-500">{localTime(processedAt)}</time>
                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground">Order status changed to &quot;Processing&quot;</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, repellendus?</p>
                    <Button size="sm" className="mt-3" variant={shippedAt ? 'secondary' : 'default'} startContent={shippedAt ? <CheckIcon /> : null}>
                        {shippedAt ? 'Order Shipped' : 'Ship Order'}
                    </Button>
                </li>
            )}
            {shippedAt && (
                <li className="ms-6">
                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-8 ring-white dark:bg-primary dark:ring-gray-900">
                        <ClockIcon size={16} className="text-background" />
                    </span>
                    <time className="mb-1 text-base font-normal leading-none text-secondary-foreground dark:text-gray-500">{localTime(shippedAt)}</time>
                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground">Order status changed to &quot;Shipped&quot;</h3>
                    <Button size="sm" className="mt-3" variant={processedAt ? 'secondary' : 'default'} startContent={processedAt ? <CheckIcon /> : null}>
                        Process Order
                    </Button>
                </li>
            )}
        </ol>
    );
};
