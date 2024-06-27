'use client';
import { DateField } from '@/components/DateField';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CouponType, CouponUsageType } from '@/graphql/generated';
import { CouponSchema } from '@/lib/zod/schemas';
import { useCoupons } from '@/providers/coupon.provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderIcon } from 'lucide-react';
import { FC, HTMLAttributes, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { capitalize } from 'lodash';

interface CouponBaseProps extends HTMLAttributes<HTMLFormElement> {
    action: 'create' | 'edit';
}
interface CreateCouponProps extends CouponBaseProps {
    action: 'create';
}
interface EditCouponProps extends CouponBaseProps {
    action: 'edit';
    id: string;
}

type CouponFormProps = CreateCouponProps | EditCouponProps;

type FormData = z.infer<typeof CouponSchema>;

const couponType = Object.values(CouponType);
const couponUsageType = Object.values(CouponUsageType);

export const CouponForm: FC<CouponFormProps> = ({ action, id, ...props }) => {
    const { loading, coupons, create, update } = useCoupons();
    const [selectedCouponType, setSelectedCouponType] = useState<CouponType>(CouponType.Flat);
    const form = useForm<FormData>({ resolver: zodResolver(CouponSchema) });

    const handleSubmit = async (formData: FormData) => {
        if (action === 'create') await create(formData);
        if (action === 'edit') await update({ id, ...formData });
        form.reset(undefined);
    };

    const handleCouponTypeChange = (value: CouponType) => {
        setSelectedCouponType(value);
        form.setValue('type', value);
    };

    useEffect(() => {
        if (action === 'edit') {
            const coupon = coupons.find((x) => x.id === id);
            if (coupon) {
                form.setValue('title', coupon.title);
                form.setValue('code', coupon.code);
                form.setValue('description', coupon.description ?? '');
                form.setValue('type', coupon.type as CouponType);
                form.setValue('usageType', coupon.usageType as CouponUsageType);
                form.setValue('amount', coupon.amount);
                form.setValue('percentage', coupon.percentage);
                form.setValue('validFrom', coupon.validFrom);
                form.setValue('validThrough', coupon.validThrough);
            }
        }
    }, [action, id, coupons, form]);

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
                    name="code"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Coupon Code</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
                            <FormDescription>Min 3 and Max 7 characters</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea rows={6} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Coupon Type</FormLabel>
                                <FormControl>
                                    <Select onValueChange={(value) => handleCouponTypeChange(value as CouponType)} defaultValue={selectedCouponType}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select the type of coupon" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {couponType.map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="usageType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Coupon Usage Type</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={CouponUsageType.MultiUse}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select the usage type of coupon" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {couponUsageType.map((type) => (
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
                </div>
                {selectedCouponType === CouponType.Flat && (
                    <FormField
                        name="amount"
                        control={form.control}
                        render={({ field: { value, ...field } }) => (
                            <FormItem>
                                <FormLabel>Discount Amount</FormLabel>
                                <FormControl>
                                    <Input type="text" value={value ?? 0} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                {selectedCouponType === CouponType.Percentage && (
                    <FormField
                        name="percentage"
                        control={form.control}
                        render={({ field: { value, ...field } }) => (
                            <FormItem>
                                <FormLabel>Discount Percentage</FormLabel>
                                <FormControl>
                                    <Input type="text" value={value ?? 0} {...field} />
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
                <Button type="submit" size="lg" className="w-full" endContent={loading && <LoaderIcon className="animate-spin" />} disabled={loading}>
                    {action === 'create' ? 'Create' : 'Update'} Coupon
                </Button>
            </form>
        </Form>
    );
};
