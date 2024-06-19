import * as React from 'react';

import { cn } from '@/lib/utils';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    condensed?: boolean;
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    condensed?: boolean;
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    condensed?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('divide-y rounded-lg border bg-card text-card-foreground shadow-sm', className)} {...props} />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className, condensed, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5', condensed ? 'px-6 py-3' : 'p-6', className)} {...props} />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props} />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ className, condensed, ...props }, ref) => (
    <div ref={ref} className={cn(condensed ? 'px-6 py-3' : 'p-6', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({ className, condensed, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center', condensed ? 'px-6 py-3' : 'p-6', className)} {...props} />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
