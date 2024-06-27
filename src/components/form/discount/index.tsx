'use client';
import { DateField } from '@/components/DateField';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CreateDiscountInput, DiscountType } from '@/graphql/generated';
import { DiscountSchema } from '@/lib/zod/schemas';
import { useDiscounts } from '@/providers/discount.provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, HTMLAttributes, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface DiscountBaseProps extends HTMLAttributes<HTMLDivElement> {
    action: 'create' | 'update';
}

interface DiscountCreateProps extends DiscountBaseProps {
    action: 'create';
}

interface DiscountUpdateProps extends DiscountBaseProps {
    action: 'update';
    id: string;
}

type DiscountFormProps = DiscountCreateProps | DiscountUpdateProps;

type FormData = z.infer<typeof DiscountSchema>;

const discountType = Object.values(DiscountType);

export const DiscountForm: FC<DiscountFormProps> = ({ action, id, ...props }) => {
    const { discounts, create, update } = useDiscounts();
    const form = useForm<FormData>({ resolver: zodResolver(DiscountSchema) });
    const [selectedDiscountType, setselectedDiscountType] = useState<DiscountType>();

    const handleSubmit = async (input: FormData) => {
        try {
            if (action === 'create') create(input);
            if (action === 'update') update({ id, ...input });
            form.reset();
        } catch (error) {
            console.log('🚀 ~ handleSubmit ~ error:', error);
        }
    };

    const handleDiscountTypeChange = (value: DiscountType) => {
        setselectedDiscountType(value);
        form.setValue('type', value);
    };

    useEffect(() => {
        if (action === 'update') {
            const discount = discounts.find((x) => x.id === id);
            if (discount) {
                Object.entries(discount).map(([key, val]) => form.setValue(key as any, val));
                setselectedDiscountType(discount.type);
            }
        }
    }, [action, id, discounts, form]);

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
                                <Input type="text" placeholder="Enter title for your discount" {...field} />
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
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Textarea rows={6} value={value ?? ''} placeholder="Enter description for your discount" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Discount Type</FormLabel>
                            <FormControl>
                                <Select onValueChange={(value) => handleDiscountTypeChange(value as DiscountType)} value={selectedDiscountType}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select the usage type of coupon" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {discountType.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type.split('_').join(' ')}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />
                {selectedDiscountType === DiscountType.Flat && (
                    <FormField
                        name="amount"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Discount Amount" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                {selectedDiscountType === DiscountType.Percentage && (
                    <FormField
                        name="percentage"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Percentage</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Discount Percentage" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <div className="grid grid-cols-2 gap-6">
                    <FormField
                        name="validFrom"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Valid From</FormLabel>
                                <DateField field={field} disabled={(date) => date < new Date()} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="validThrough"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Valid Through</FormLabel>
                                <DateField field={field} disabled={(date) => date < new Date()} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button size="lg" className="w-full" type="submit">
                    {action === 'create' ? 'Create' : 'Update'} Discount
                </Button>
            </form>
        </Form>
    );
};
