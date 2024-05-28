import { cn } from '@/lib/utils';
import { FC, HTMLAttributes } from 'react';

interface SalePriceProps extends HTMLAttributes<HTMLHeadingElement> {
    price: number;
}

interface RetailPriceProps extends HTMLAttributes<HTMLParagraphElement> {
    price: number;
}

export const SalePrice: FC<SalePriceProps> = ({ price, className, ...props }) => {
    return (
        <h2 className={cn('text-success my-0', className)} {...props}>
            ${price}
        </h2>
    );
};

export const RetailPrice: FC<RetailPriceProps> = ({ price, className, ...props }) => {
    return (
        <p className={cn('my-0 text-muted-foreground line-through', className)} {...props}>
            ${price}
        </p>
    );
};
