import { cn } from '@/lib/utils';
import { FC, HTMLAttributes } from 'react';

interface ListItemProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const ListItem: FC<ListItemProps> = ({ className, children, ...props }) => {
    return (
        <div className={cn('hover:bg-muted/50', className)} {...props}>
            {children}
        </div>
    );
};
