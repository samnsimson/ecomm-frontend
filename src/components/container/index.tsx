import { cn } from '@/libs/utils/cn';
import { FC, HTMLAttributes } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const Container: FC<ContainerProps> = ({ children, className, ...props }) => {
    return (
        <div {...props} className={cn('max-w-7xl w-full mx-auto', className)}>
            {children}
        </div>
    );
};
