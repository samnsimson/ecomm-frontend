'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { TaxTypes } from '@/graphql/generated';
import { TaxesSchema } from '@/lib/zod/schemas';
import { useTaxes } from '@/providers/tax.provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalize } from 'lodash';
import { FC, HTMLAttributes, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface BaseTaxesFormProps extends HTMLAttributes<HTMLDivElement> {
    action: 'create' | 'update';
}

interface CreateTaxesFormProps extends BaseTaxesFormProps {
    action: 'create';
}

interface UpdateTaxesFormProps extends BaseTaxesFormProps {
    action: 'update';
    id: string;
}

type TaxesFormProps = CreateTaxesFormProps | UpdateTaxesFormProps;

type FormType = z.infer<typeof TaxesSchema>;

export const TaxesForm: FC<TaxesFormProps> = ({ action, id, ...props }) => {
    const { taxes, create, update } = useTaxes();
    const form = useForm<FormType>({ resolver: zodResolver(TaxesSchema) });
    const [type, setType] = useState(TaxTypes.Percentage);

    const handleTaxTypeChange = (data: string, field: any) => {
        if (data === 'FLAT') setType(TaxTypes.Flat);
        if (data === 'PERCENTAGE') setType(TaxTypes.Percentage);
        return field.onChange(data);
    };

    const handleSubmit = async (data: FormType) => {
        try {
            if (action === 'create') await create({ ...data, enabled: false });
            if (action === 'update') await update({ id, ...data });
            toast.success('Success', { description: `Tax ${capitalize(action)}d Successfully` });
        } catch (error) {
            toast.error('Error');
            console.log('🚀 ~ handleSubmit ~ error:', error);
        }
    };

    useEffect(() => {
        if (action === 'update') {
            const tax = taxes.find((x) => x.id === id);
            if (tax) {
                Object.entries(tax).map(([key, val]) => form.setValue(key as any, val));
                setType(tax.type);
            }
        }
    }, [action, id, form, taxes]);

    return (
        <Form {...form} {...props}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                    name="title"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="col-span-3">
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
                    render={({ field }) => (
                        <FormItem className="col-span-3">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea rows={6} {...field} />
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
                            <FormLabel>Tax Type</FormLabel>
                            <FormControl>
                                <Select onValueChange={(val) => handleTaxTypeChange(val, field)} defaultValue={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Tax Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={TaxTypes.Flat}>FLAT</SelectItem>
                                        <SelectItem value={TaxTypes.Percentage}>PERCENTAGE</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {type === TaxTypes.Flat && (
                    <FormField
                        name="amount"
                        control={form.control}
                        render={({ field: { value, ...field } }) => (
                            <FormItem>
                                <FormLabel>Tax Amount</FormLabel>
                                <FormControl>
                                    <Input type="number" min={0} value={value ?? 0} {...field} />
                                </FormControl>
                                <FormDescription>If Tax Type = &quot;Flat&quot;</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                {type === TaxTypes.Percentage && (
                    <FormField
                        name="percentage"
                        control={form.control}
                        render={({ field: { value, ...field } }) => (
                            <FormItem>
                                <FormLabel>Tax Percentage</FormLabel>
                                <FormControl>
                                    <Input type="number" min={0} value={value ?? 0} {...field} />
                                </FormControl>
                                <FormDescription>If Tax Type = &quot;Percentage&quot;</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <Button size="lg" type="submit" className="w-full">
                    {action === 'create' ? 'Create' : 'Update'} Tax
                </Button>
            </form>
        </Form>
    );
};
