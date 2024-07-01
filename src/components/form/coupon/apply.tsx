'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ApplyCouponSchema } from '@/lib/zod/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface ApplyCouponFormProps extends HTMLAttributes<HTMLDivElement> {
    onCouponApply: (data: FormData) => void;
}

type FormData = z.infer<typeof ApplyCouponSchema>;

export const ApplyCouponForm: FC<ApplyCouponFormProps> = ({ onCouponApply, ...props }) => {
    const form = useForm<FormData>({ resolver: zodResolver(ApplyCouponSchema), mode: 'onBlur' });

    return (
        <Form {...form} {...props}>
            <form onSubmit={form.handleSubmit(onCouponApply)} className="flex items-center space-x-4">
                <FormField
                    name="code"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Apply Coupon</FormLabel>
                            <FormDescription>Enter coupon code to apply discount</FormDescription>
                            <FormControl>
                                <div className="flex items-center space-x-4">
                                    <Input type="text" {...field} className="max-w-[200px]" />
                                    <Button type="submit">Apply</Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};
