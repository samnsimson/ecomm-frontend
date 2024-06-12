'use client';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { BillingInfoSchema } from '@/lib/zod/schemas';
import { useBillingAndShipping } from '@/providers/billing-and-shipping.provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, HTMLAttributes, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface BillingInfoProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

type FormType = z.infer<typeof BillingInfoSchema>;

export const BillingInfo: FC<BillingInfoProps> = ({ ...props }) => {
    const { billingData, sameAsShipping } = useBillingAndShipping();
    const form = useForm<FormType>({ resolver: zodResolver(BillingInfoSchema) });

    useEffect(() => {
        form.setValue('addressOne', billingData.addressOne);
        form.setValue('addressTwo', billingData.addressTwo);
        form.setValue('city', billingData.city);
        form.setValue('state', billingData.state);
        form.setValue('country', billingData.country);
        form.setValue('zipcode', billingData.zipcode);
    }, [billingData, form]);

    return (
        <Form {...form} {...props}>
            <form className="grid grid-cols-2 gap-6">
                <FormField
                    name="addressOne"
                    control={form.control}
                    disabled={sameAsShipping}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address line one</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} className="disabled:bg-border" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="addressTwo"
                    control={form.control}
                    disabled={sameAsShipping}
                    render={({ field: { value, ...field } }) => (
                        <FormItem>
                            <FormLabel>Address line two</FormLabel>
                            <FormControl>
                                <Input type="text" value={value ?? ''} {...field} className="disabled:bg-border" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="city"
                    control={form.control}
                    disabled={sameAsShipping}
                    render={({ field: { value, ...field } }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input type="text" value={value ?? ''} {...field} className="disabled:bg-border" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="state"
                    control={form.control}
                    disabled={sameAsShipping}
                    render={({ field: { value, ...field } }) => (
                        <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                                <Input type="text" value={value ?? ''} {...field} className="disabled:bg-border" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="country"
                    control={form.control}
                    disabled={sameAsShipping}
                    render={({ field: { value, ...field } }) => (
                        <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input type="text" value={value ?? ''} {...field} className="disabled:bg-border" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="zipcode"
                    control={form.control}
                    disabled={sameAsShipping}
                    render={({ field: { value, ...field } }) => (
                        <FormItem>
                            <FormLabel>Zipcode</FormLabel>
                            <FormControl>
                                <Input type="text" value={value ?? ''} {...field} className="disabled:bg-border" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="email"
                    control={form.control}
                    render={({ field: { value, ...field } }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="text" value={value ?? ''} {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="phone"
                    control={form.control}
                    render={({ field: { value, ...field } }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input type="text" value={value ?? ''} {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};
