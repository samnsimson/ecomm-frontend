'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { BillingInfoSchema } from '@/lib/zod/schemas';
import { inititalBillingData, useBillingAndShipping } from '@/providers/billing-and-shipping.provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, HTMLAttributes, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface BillingInfoProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

type FormType = z.infer<typeof BillingInfoSchema>;

export const BillingInfo: FC<BillingInfoProps> = ({ ...props }) => {
    const { shippingData, setBillingData, setBillingValid } = useBillingAndShipping();
    const form = useForm<FormType>({ resolver: zodResolver(BillingInfoSchema), mode: 'onBlur', defaultValues: inititalBillingData });
    const [sameAsShipping, setSameAsShipping] = useState<boolean>(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const continueToPayment = (formData: FormType) => {
        setBillingData(formData);
    };

    useEffect(() => {
        console.log('Billing Valid', form.formState.isValid);
        setButtonDisabled(form.formState.isValid);
        setBillingValid(form.formState.isValid);
    }, [form.formState.isValid, setBillingValid]);

    useEffect(() => {
        form.setValue('addressOne', sameAsShipping ? shippingData.addressOne : '');
        form.setValue('addressTwo', sameAsShipping ? shippingData.addressTwo : '');
        form.setValue('city', sameAsShipping ? shippingData.city : '');
        form.setValue('state', sameAsShipping ? shippingData.state : '');
        form.setValue('country', sameAsShipping ? shippingData.country : '');
        form.setValue('zipcode', sameAsShipping ? shippingData.zipcode : '');
    }, [shippingData, form, sameAsShipping]);

    return (
        <Form {...form} {...props}>
            <form onSubmit={form.handleSubmit(continueToPayment)} className="grid grid-cols-2 gap-6">
                <div className="col-span-2 flex items-center space-x-2">
                    <Checkbox id="reuseAddress" onCheckedChange={(val) => setSameAsShipping(!!val)} />
                    <label htmlFor="reuseAddress" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Billing address is same as shipping address
                    </label>
                </div>
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
                            <FormMessage />
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
                            <FormMessage />
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
                            <FormMessage />
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
                            <FormMessage />
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
                            <FormMessage />
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
                            <FormMessage />
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
                            <FormMessage />
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
