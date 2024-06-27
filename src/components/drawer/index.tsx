import { FC, PropsWithChildren, ReactElement } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { DialogProps } from '@radix-ui/react-dialog';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const drawerVariants = cva('', {
    variants: {
        size: {
            small: 'w-[400px]',
            medium: 'w-[540px]',
            large: 'w-[720px]',
        },
    },
    defaultVariants: {
        size: 'small',
    },
});

interface DrawerProps extends DialogProps, VariantProps<typeof drawerVariants> {
    trigger: string | number | ReactElement;
    title: string | number | ReactElement;
    description?: string | number | ReactElement | undefined;
    side?: 'top' | 'bottom' | 'left' | 'right';
}

export const Drawer: FC<DrawerProps & PropsWithChildren> = ({ children, trigger, title, description, side = 'right', size, ...props }) => {
    return (
        <Sheet {...props}>
            <SheetTrigger asChild>{trigger}</SheetTrigger>
            <SheetContent side={side} className={cn('max-w-auto flex flex-col gap-0 divide-y bg-card p-0', drawerVariants({ size }))}>
                <SheetHeader className="flex h-[100px] flex-col space-y-1 p-6">
                    <SheetTitle>{title}</SheetTitle>
                    {description && <SheetDescription>{description}</SheetDescription>}
                </SheetHeader>
                <div className="flex-1 overflow-y-scroll p-6">{children}</div>
            </SheetContent>
        </Sheet>
    );
};
