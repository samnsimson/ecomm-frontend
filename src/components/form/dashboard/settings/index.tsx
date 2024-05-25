'use client';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { FC, HTMLAttributes, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { z } from 'zod';
import { SettingsSchema } from '@/lib/zod/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useSaveSettingsMutation } from '@/graphql/generated';
import { toast } from 'sonner';
import { useStore } from '@/providers/store.provider';
import { SaveIcon } from 'lucide-react';

interface SettingsFormProps extends HTMLAttributes<HTMLFormElement> {
    [x: string]: any;
}

type FormType = z.infer<typeof SettingsSchema>;

export const SettingsForm: FC<SettingsFormProps> = ({ ...props }) => {
    const form = useForm<FormType>({ resolver: zodResolver(SettingsSchema) });
    const [saveSettings] = useSaveSettingsMutation();
    const { settings, setSettings } = useStore((store) => store);

    const handleSubmit = async (input: FormType) => {
        try {
            const { data } = await saveSettings({ variables: { input } });
            data && setSettings(data.saveSetting);
            toast.success('Success', { description: 'Settings saved successfully' });
        } catch (error: any) {
            toast.error('Something went wrong!', { description: error.message });
        }
    };

    useEffect(() => {
        form.setValue('addressOne', settings.addressOne);
        form.setValue('addressTwo', settings.addressTwo);
        form.setValue('city', settings.city);
        form.setValue('state', settings.state);
        form.setValue('country', settings.country);
        form.setValue('zipcode', settings.zipcode);
        form.setValue('email', settings.email);
        form.setValue('phone', settings.phone);
        form.setValue('currency', settings.currency);
        form.setValue('taxesEnabled', settings.taxesEnabled);
        form.setValue('couponsEnabled', settings.couponsEnabled);
        form.setValue('shippingEnabled', settings.shippingEnabled);
        form.setValue('discountsEnabled', settings.discountsEnabled);
    }, [settings]);

    return (
        <Form {...form} {...props}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <Card className="divide-y">
                    <CardHeader>
                        <CardTitle>Store info</CardTitle>
                        <CardDescription>Location and contact information</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-6 p-6">
                        <FormField
                            control={form.control}
                            name="addressOne"
                            render={({ field: { value, ...field } }) => (
                                <FormItem>
                                    <FormLabel>Address line 1</FormLabel>
                                    <FormControl>
                                        <Input type="text" value={value ?? ''} {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="addressTwo"
                            render={({ field: { value, ...field } }) => (
                                <FormItem>
                                    <FormLabel>Address line 2</FormLabel>
                                    <FormControl>
                                        <Input type="text" value={value ?? ''} {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="city"
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
                            control={form.control}
                            name="state"
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
                            control={form.control}
                            name="country"
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
                            control={form.control}
                            name="zipcode"
                            render={({ field: { value, ...field } }) => (
                                <FormItem>
                                    <FormLabel>Zipcode</FormLabel>
                                    <FormControl>
                                        <Input type="text" value={value ?? ''} {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
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
                            control={form.control}
                            name="phone"
                            render={({ field: { value, ...field } }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input type="text" value={value ?? ''} {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
                <Card className="divide-y">
                    <CardHeader>
                        <CardTitle>Store options</CardTitle>
                        <CardDescription>Shipping, Taxes, Coupons & Discounts</CardDescription>
                    </CardHeader>
                    <CardContent className="divide-y p-0">
                        <FormField
                            control={form.control}
                            name="shippingEnabled"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between px-6 py-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">Enable Shipping</FormLabel>
                                        <FormDescription>If enabled, shipping cost will be calculated to the cart subtotal.</FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch checked={field.value ?? false} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="taxesEnabled"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between px-6 py-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">Enable Taxes</FormLabel>
                                        <FormDescription>If enabled, taxes will be calculated to the cart subtotal.</FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch checked={field.value ?? false} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="couponsEnabled"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between px-6 py-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">Enable Coupons</FormLabel>
                                        <FormDescription>If enabled, customers will be allowed to apply coupons while checkout</FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch checked={field.value ?? false} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="discountsEnabled"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between px-6 py-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">Enable Discounts</FormLabel>
                                        <FormDescription>If enabled, customers will be allowed to apply discounts while checkout</FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch checked={field.value ?? false} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <Button className="w-full" type="submit" size="lg" startContent={<SaveIcon />}>
                            Save Settings
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </Form>
    );
};
