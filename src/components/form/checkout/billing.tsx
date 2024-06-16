'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Store } from '@/lib/types';
import { BillingInfoSchema } from '@/lib/zod/schemas';
import { useBillingAndShipping } from '@/providers/billing-and-shipping.provider';
import { useStore } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, HTMLAttributes, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface BillingInfoProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

type FormType = z.infer<typeof BillingInfoSchema>;

export const BillingInfo: FC<BillingInfoProps> = ({ ...props }) => {
    const { shippingData, billingData, sameAsShipping, setBillingData, setBillingValid, setActiveForm, setSameAsShipping, createOrder } =
        useBillingAndShipping();
    const form = useForm<FormType>({ resolver: zodResolver(BillingInfoSchema), mode: 'onBlur', defaultValues: billingData });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const { cartData } = useStore<Store>((state) => state);

    const continueToPayment = (formData: FormType) => {
        setBillingData(formData);
        if (cartData) createOrder(cartData);
        setActiveForm('payment');
    };

    useEffect(() => {
        if (sameAsShipping) {
            form.setValue('addressOne', shippingData.addressOne);
            form.setValue('addressTwo', shippingData.addressTwo);
            form.setValue('city', shippingData.city);
            form.setValue('state', shippingData.state);
            form.setValue('country', shippingData.country);
            form.setValue('zipcode', shippingData.zipcode);
        } else {
            form.reset();
        }
    }, [shippingData, form, sameAsShipping]);

    useEffect(() => {
        setButtonDisabled(!form.formState.isValid);
        setBillingValid(form.formState.isValid);
    }, [form.formState.isValid, setBillingValid]);

    return (
        <Form {...form} {...props}>
            <form onSubmit={form.handleSubmit(continueToPayment)} className="grid grid-cols-2 gap-6">
                <div className="col-span-2 flex items-center space-x-2">
                    <Checkbox id="reuseAddress" onCheckedChange={(val) => setSameAsShipping(!!val)} checked={sameAsShipping} />
                    <label htmlFor="reuseAddress" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Billing address is same as shipping address
                    </label>
                </div>
                <FormField
                    name="addressOne"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address line one</FormLabel>
                            <FormControl>
                                <Input type="text" readOnly={sameAsShipping} autoComplete="addressOne" {...field} className="read-only:bg-muted" />
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
                                <Input
                                    type="text"
                                    readOnly={sameAsShipping}
                                    autoComplete="addressTwo"
                                    value={value ?? ''}
                                    {...field}
                                    className="read-only:bg-muted"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="city"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input type="text" readOnly={sameAsShipping} autoComplete="city" {...field} className="read-only:bg-muted" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="state"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                                <Input type="text" readOnly={sameAsShipping} autoComplete="state" {...field} className="read-only:bg-muted" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="country"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input type="text" readOnly={sameAsShipping} autoComplete="country" {...field} className="read-only:bg-muted" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="zipcode"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Zipcode</FormLabel>
                            <FormControl>
                                <Input type="text" readOnly={sameAsShipping} autoComplete="zipcode" {...field} className="read-only:bg-muted" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" autoComplete="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="phone"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input type="tel" autoComplete="phone" {...field} />
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
