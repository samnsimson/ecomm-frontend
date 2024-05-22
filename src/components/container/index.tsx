import { cn } from '@/libs/utils/cn';
import { FC, HTMLAttributes } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const Container: FC<ContainerProps> = ({ children, className, ...props }) => {
    return (
        <div {...props} className={cn('mx-auto w-full max-w-7xl', className)}>
            {children}
        </div>
    );
};
