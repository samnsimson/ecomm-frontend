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
import { FC, HTMLAttributes, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface TaxesFormProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

type FormType = z.infer<typeof TaxesSchema>;

export const TaxesForm: FC<TaxesFormProps> = ({ ...props }) => {
    const { createTax } = useTaxes();
    const form = useForm<FormType>({ resolver: zodResolver(TaxesSchema) });
    const [type, setType] = useState(TaxTypes.Percentage);

    const handleTaxTypeChange = (data: string, field: any) => {
        if (data === 'FLAT') setType(TaxTypes.Flat);
        if (data === 'PERCENTAGE') setType(TaxTypes.Percentage);
        return field.onChange(data);
    };

    const handleSubmit = async (data: FormType) => {
        createTax({ ...data, enabled: false }).finally(() => form.reset());
    };

    return (
        <Form {...form} {...props}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-3 gap-6">
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
                <FormField
                    name="amount"
                    control={form.control}
                    render={({ field: { value, ...field } }) => (
                        <FormItem>
                            <FormLabel>Tax Amount</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min={0}
                                    value={value ?? 0}
                                    disabled={type === TaxTypes.Percentage}
                                    className="disabled:bg-muted"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>If Tax Type = &quot;Flat&quot;</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="percentage"
                    control={form.control}
                    render={({ field: { value, ...field } }) => (
                        <FormItem>
                            <FormLabel>Tax Percentage</FormLabel>
                            <FormControl>
                                <Input type="number" min={0} value={value ?? 0} disabled={type === TaxTypes.Flat} className="disabled:bg-border" {...field} />
                            </FormControl>
                            <FormDescription>If Tax Type = &quot;Percentage&quot;</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button size="lg" type="submit" className="col-span-3">
                    Create Tax
                </Button>
            </form>
        </Form>
    );
};
