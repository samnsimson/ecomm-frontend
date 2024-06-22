'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ShippingType } from '@/graphql/generated';
import { ShippingsSchema } from '@/lib/zod/schemas';
import { useShipping } from '@/providers/shipping.provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, HTMLAttributes, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface BaseFormProps extends HTMLAttributes<HTMLFormElement> {
    action: 'create' | 'edit';
}

interface CreateForm extends BaseFormProps {
    action: 'create';
}

interface UpdateForm extends BaseFormProps {
    action: 'edit';
    id: string;
}

type ShippingFormProps = CreateForm | UpdateForm;
type FormType = z.infer<typeof ShippingsSchema>;

export const ShippingForm: FC<ShippingFormProps> = ({ action, id, ...props }) => {
    const { shippings, create, update } = useShipping();

    const form = useForm<FormType>({
        resolver: zodResolver(ShippingsSchema),
        defaultValues: { title: '', description: '', type: ShippingType.Free, amount: 0, percentage: 0 },
    });

    const handleSubmit = async (formData: FormType) => {
        if (action === 'create') await create({ ...formData, enabled: true });
        if (action === 'edit') await update({ id, ...formData });
    };

    useEffect(() => {
        if (action === 'edit') {
            const shipping = shippings.find((x) => x.id === id);
            if (!shipping) return;
            form.setValue('title', shipping.title);
            form.setValue('description', shipping.description);
            form.setValue('type', shipping.type);
            form.setValue('amount', shipping.amount);
            form.setValue('percentage', shipping.percentage);
        }
    }, [action, id, shippings, form]);

    return (
        <Form {...form} {...props}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                    name="title"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="description"
                    control={form.control}
                    render={({ field: { value, ...field } }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea rows={6} value={value ?? ''} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="type"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Shipping Type</FormLabel>
                            <FormControl>
                                <Select onValueChange={(val) => {}} defaultValue={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Shipping Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={ShippingType.Free}>FREE</SelectItem>
                                        <SelectItem value={ShippingType.Flat}>FLAT RATE</SelectItem>
                                        <SelectItem value={ShippingType.Percentage}>PERCENTAGE</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="amount"
                    control={form.control}
                    render={({ field: { value, ...field } }) => (
                        <FormItem>
                            <FormLabel>Shipping Amount</FormLabel>
                            <FormControl>
                                <Input type="number" min={0} value={value ?? 0} className="disabled:bg-border" {...field} />
                            </FormControl>
                            <FormDescription>If Shipping Type = &quot;Flat&quot;</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="percentage"
                    control={form.control}
                    render={({ field: { value, ...field } }) => (
                        <FormItem>
                            <FormLabel>Shipping Percentage</FormLabel>
                            <FormControl>
                                <Input type="number" min={0} value={value ?? 0} className="disabled:bg-border" {...field} />
                            </FormControl>
                            <FormDescription>If Shipping Type = &quot;Percentage&quot;</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" size="lg" className="w-full">
                    {action === 'create' ? 'Create shipping' : 'Update Shipping'}
                </Button>
            </form>
        </Form>
    );
};
