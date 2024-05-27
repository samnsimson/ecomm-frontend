import { cn } from '@/lib/utils';
import { Children, FC, HTMLAttributes, cloneElement } from 'react';

interface ListProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const List: FC<ListProps> = ({ className, children, ...props }) => {
    return (
        <div className={cn('flex flex-col divide-y', className)} {...props}>
            {Children.map(children, (child) => child && cloneElement(child as any))}
        </div>
    );
};
