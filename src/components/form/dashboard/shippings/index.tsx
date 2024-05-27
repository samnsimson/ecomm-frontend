'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ShippingType, useCreateShippingMutation } from '@/graphql/generated';
import { cn } from '@/lib/utils';
import { ShippingsSchema } from '@/lib/zod/schemas';
import { useShipping } from '@/providers/shipping.provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, HTMLAttributes, useEffect, useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface ShippingFormProps extends HTMLAttributes<HTMLFormElement> {
    [x: string]: any;
}

type FormType = z.infer<typeof ShippingsSchema>;

export const ShippingForm: FC<ShippingFormProps> = ({ ...props }) => {
    const { refetch, context, update, setContext } = useShipping();
    const [type, setType] = useState(ShippingType.Free);
    const [createShipping] = useCreateShippingMutation();
    const form = useForm<FormType>({
        resolver: zodResolver(ShippingsSchema),
        defaultValues: { title: '', description: '', type: ShippingType.Free, amount: 0, percentage: 0 },
    });

    const handleShippingTypeChange = (data: string, field: any) => {
        if (data === 'FREE') setType(ShippingType.Free);
        if (data === 'FLAT') setType(ShippingType.Flat);
        if (data === 'PERCENTAGE') setType(ShippingType.Percentage);
        return field.onChange(data);
    };

    const handleSubmit = async (input: FormType) => {
        try {
            if (context) await update(context.id, input);
            else await createShipping({ variables: { input } });
            toast.success('Success', { description: 'Shipping type created successfully' });
            refetch();
        } catch (error: any) {
            toast.error('Error', { description: error.message });
        } finally {
            form.reset();
            setContext(undefined);
        }
    };

    const clearForm = () => {
        setContext(undefined);
        form.reset();
    };

    useEffect(() => {
        if (context) {
            form.setValue('title', context.title);
            form.setValue('description', context.description);
            form.setValue('type', context.type);
            form.setValue('amount', context.amount);
            form.setValue('percentage', context.percentage);
        }
    }, [context]);

    return (
        <Form {...form} {...props}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                    name="title"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormDescription>Enter the titie of your shipping option</FormDescription>
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
                            <FormDescription>Enter a short description for the shipping option</FormDescription>
                            <FormControl>
                                <Textarea rows={6} value={value ?? ''} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-3 gap-6">
                    <FormField
                        name="type"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Shipping Type</FormLabel>
                                <FormControl>
                                    <Select onValueChange={(val) => handleShippingTypeChange(val, field)} defaultValue={field.value}>
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
                                    <Input
                                        type="number"
                                        min={0}
                                        value={value ?? 0}
                                        disabled={[ShippingType.Free, ShippingType.Percentage].includes(type)}
                                        className="disabled:bg-border"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>If Shipping Type = "Flat"</FormDescription>
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
                                    <Input
                                        type="number"
                                        min={0}
                                        value={value ?? 0}
                                        disabled={[ShippingType.Free, ShippingType.Flat].includes(type)}
                                        className="disabled:bg-border"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>If Shipping Type = "Percentage"</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-6">
                    {!!context && (
                        <Button type="button" size="lg" variant="outline" onClick={() => clearForm()} className="col-span-1">
                            Clear form
                        </Button>
                    )}
                    <Button type="submit" size="lg" className={cn(!!context ? 'col-span-1' : 'col-span-2')}>
                        {!!context ? 'Update' : 'Create'} Shipping
                    </Button>
                </div>
            </form>
        </Form>
    );
};
