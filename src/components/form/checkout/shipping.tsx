'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ShippingInfoSchema } from '@/lib/zod/schemas';
import { inititalBillingData, useBillingAndShipping } from '@/providers/billing-and-shipping.provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { FC, HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface ShippingInfoProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

type FormType = z.infer<typeof ShippingInfoSchema>;

export const ShippingInfo: FC<ShippingInfoProps> = ({ ...props }) => {
    const { data } = useSession();
    const { setBillingData, setSameAsShipping } = useBillingAndShipping();
    const form = useForm<FormType>({ resolver: zodResolver(ShippingInfoSchema) });

    const setAddressForBilling = (state: boolean) => {
        if (state) {
            setBillingData({ ...form.getValues(), email: data?.user.email || '', phone: '' });
            setSameAsShipping(true);
        } else {
            setBillingData(inititalBillingData);
            setSameAsShipping(false);
        }
    };

    return (
        <Form {...form} {...props}>
            <form className="grid grid-cols-2 gap-6">
                <FormField
                    name="addressOne"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address line one</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
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
                                <Input type="text" value={value ?? ''} {...field} />
                            </FormControl>
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
                                <Input type="text" value={value ?? ''} {...field} />
                            </FormControl>
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
                                <Input type="text" value={value ?? ''} {...field} />
                            </FormControl>
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
                                <Input type="text" value={value ?? ''} {...field} />
                            </FormControl>
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
                                <Input type="text" value={value ?? ''} {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="flex items-center space-x-2">
                    <Checkbox id="reuseAddress" onCheckedChange={(state) => setAddressForBilling(!!state)} />
                    <label htmlFor="reuseAddress" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Billing address is same as shipping address
                    </label>
                </div>
            </form>
        </Form>
    );
};
