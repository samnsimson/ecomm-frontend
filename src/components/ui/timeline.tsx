'use client';
import { localTime } from '@/lib/helpers';
import { BanIcon, CheckCheckIcon, CheckIcon, ClockIcon } from 'lucide-react';
import { FC, HTMLAttributes } from 'react';
import { Button } from './button';
import { OrderStatus } from '@/graphql/generated';
import { toast } from 'sonner';
import { useOrder } from '@/providers/order.provider';
import { cn } from '@/lib/utils';

interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
    id: string;
}

export const Timeline: FC<TimelineProps> = ({ id, ...props }) => {
    const { order, updateOrder } = useOrder();
    const { createdAt, updatedAt, processedAt, fulfilledAt, shippedAt, cancelledAt } = order;

    const updateOrderStatus = async (status: OrderStatus) => {
        const { errors } = await updateOrder({ id, status });
        if (errors) toast.error('Failed to update order');
        else toast.success(`Order status changed to ${status}`);
    };

    const isOrderCreated = !!createdAt;
    const isOrderProcessed = !!processedAt;
    const isOrderShipped = !!shippedAt;
    const isOrderFulfilled = !!fulfilledAt;
    const isOrderCancelled = !!cancelledAt;

    return (
        <ol className="relative flex flex-col space-y-6 border-s border-primary dark:border-primary" {...props}>
            {isOrderCreated && (
                <li className="ms-6">
                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-8 ring-white dark:bg-primary dark:ring-gray-900">
                        <ClockIcon size={16} className="text-background" />
                    </span>
                    <time className="mb-1 text-base font-normal leading-none text-secondary-foreground dark:text-gray-500">{localTime(createdAt)}</time>
                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground">New order placed.</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, repellendus?</p>
                    <Button
                        size="sm"
                        className={cn({ 'pointer-events-none': isOrderProcessed || isOrderCancelled }, 'mt-3')}
                        variant={isOrderProcessed || isOrderCancelled ? 'secondary' : 'default'}
                        startContent={isOrderProcessed ? <CheckIcon /> : null}
                        onClick={() => !isOrderProcessed && !isOrderCancelled && updateOrderStatus(OrderStatus.Processing)}
                    >
                        {processedAt ? 'Order Processed' : 'Process Order'}
                    </Button>
                </li>
            )}
            {isOrderProcessed && (
                <li className="ms-6">
                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-8 ring-white dark:bg-primary dark:ring-gray-900">
                        <ClockIcon size={16} className="text-background" />
                    </span>
                    <time className="mb-1 text-base font-normal leading-none text-secondary-foreground dark:text-gray-500">{localTime(processedAt)}</time>
                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground">Order status changed to &quot;Processing&quot;</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, repellendus?</p>
                    <Button
                        size="sm"
                        className={cn({ 'pointer-events-none': isOrderShipped || isOrderCancelled }, 'mt-3')}
                        variant={isOrderShipped || isOrderCancelled ? 'secondary' : 'default'}
                        startContent={isOrderShipped ? <CheckIcon /> : null}
                        onClick={() => !isOrderShipped && !isOrderCancelled && updateOrderStatus(OrderStatus.Shipped)}
                    >
                        {shippedAt ? 'Order Shipped' : 'Ship Order'}
                    </Button>
                </li>
            )}
            {isOrderShipped && (
                <li className="ms-6">
                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-8 ring-white dark:bg-primary dark:ring-gray-900">
                        <ClockIcon size={16} className="text-background" />
                    </span>
                    <time className="mb-1 text-base font-normal leading-none text-secondary-foreground dark:text-gray-500">{localTime(shippedAt)}</time>
                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground">Order status changed to &quot;Shipped&quot;</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, repellendus?</p>
                    <Button
                        size="sm"
                        className={cn({ 'pointer-events-none': isOrderFulfilled || isOrderCancelled }, 'mt-3')}
                        variant={isOrderFulfilled || isOrderCancelled ? 'secondary' : 'default'}
                        startContent={isOrderFulfilled ? <CheckIcon /> : null}
                        onClick={() => !isOrderFulfilled && !isOrderCancelled && updateOrderStatus(OrderStatus.Fullfilled)}
                    >
                        {fulfilledAt ? 'Order Completed' : 'Complete Order'}
                    </Button>
                </li>
            )}
            {isOrderFulfilled && (
                <li className="ms-6">
                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-8 ring-white dark:bg-primary dark:ring-gray-900">
                        <ClockIcon size={16} className="text-background" />
                    </span>
                    <time className="mb-1 text-base font-normal leading-none text-secondary-foreground dark:text-gray-500">{localTime(fulfilledAt)}</time>
                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground">Order status changed to &quot;Fulfilled&quot;</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, repellendus?</p>
                    <Button size="sm" className="pointer-events-none mt-3" variant="success" startContent={<CheckCheckIcon />}>
                        Order Fulfilled
                    </Button>
                </li>
            )}
            {isOrderCancelled && (
                <li className="ms-6">
                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-8 ring-white dark:bg-primary dark:ring-gray-900">
                        <ClockIcon size={16} className="text-background" />
                    </span>
                    <time className="mb-1 text-base font-normal leading-none text-secondary-foreground dark:text-gray-500">{localTime(cancelledAt)}</time>
                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground">Order status changed to &quot;Cancelled&quot;</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, repellendus?</p>
                    <Button size="sm" className="pointer-events-none mt-3" variant="warning" startContent={<BanIcon size={16} />}>
                        Order Cancelled
                    </Button>
                </li>
            )}
        </ol>
    );
};
