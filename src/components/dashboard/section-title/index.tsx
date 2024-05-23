import { cn } from '@/lib/utils';
import { FC, HTMLAttributes, ReactNode } from 'react';

interface SectionTitleProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
    action?: ReactNode;
}

export const SectionTitle: FC<SectionTitleProps> = ({ className, title, description, action, ...props }) => {
    return (
        <div className={cn('flex w-full items-center justify-between', className)} {...props}>
            <div className="prose-xl">
                <h3 className="mb-0 font-semibold">{title}</h3>
                {!!description && <p className="text-sm">{description}</p>}
            </div>
            {action}
        </div>
    );
};
