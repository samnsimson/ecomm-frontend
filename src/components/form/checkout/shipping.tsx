'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ShippingInfoSchema } from '@/lib/zod/schemas';
import { useBillingAndShipping } from '@/providers/billing-and-shipping.provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { FC, HTMLAttributes, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface ShippingInfoProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

type FormType = z.infer<typeof ShippingInfoSchema>;

export const ShippingInfo: FC<ShippingInfoProps> = ({ ...props }) => {
    const { setShippingData, setActiveForm, setShippingValid, shippingData } = useBillingAndShipping();
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
    const form = useForm<FormType>({ resolver: zodResolver(ShippingInfoSchema), mode: 'onBlur', defaultValues: shippingData });

    const continueToBilling = (formData: FormType) => {
        setShippingData(formData);
        setActiveForm('billing');
    };

    useEffect(() => {
        setButtonDisabled(!form.formState.isValid);
        setShippingValid(form.formState.isValid);
    }, [form.formState.isValid, setShippingValid]);

    return (
        <Form {...form} {...props}>
            <form onSubmit={form.handleSubmit(continueToBilling)} className="grid grid-cols-2 gap-6">
                <FormField
                    name="addressOne"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address line one</FormLabel>
                            <FormControl>
                                <Input type="text" autoComplete="addressOne" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="addressTwo"
                    control={form.control}
                    render={({ field: { value, ...field } }) => (
                        <FormItem>
                            <FormLabel>Address line two</FormLabel>
                            <FormControl>
                                <Input type="text" autoComplete="addressTwo" value={value ?? ''} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="city"
                    control={form.control}
                    render={({ field: { value, ...field } }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input type="text" autoComplete="city" value={value ?? ''} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="state"
                    control={form.control}
                    render={({ field: { value, ...field } }) => (
                        <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                                <Input type="text" autoComplete="state" value={value ?? ''} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="country"
                    control={form.control}
                    render={({ field: { value, ...field } }) => (
                        <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input type="text" autoComplete="country" value={value ?? ''} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="zipcode"
                    control={form.control}
                    render={({ field: { value, ...field } }) => (
                        <FormItem>
                            <FormLabel>Zipcode</FormLabel>
                            <FormControl>
                                <Input type="text" autoComplete="zipcode" value={value ?? ''} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="col-span-2 w-full" size="lg" disabled={buttonDisabled}>
                    Continue
                </Button>
            </form>
        </Form>
    );
};
