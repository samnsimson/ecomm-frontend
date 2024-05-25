'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCreateProductMutation } from '@/graphql/generated';
import { CreateProductSchema } from '@/lib/zod/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface CreateProductFormProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

type FormType = z.infer<typeof CreateProductSchema>;

export const CreateProductForm: FC<CreateProductFormProps> = ({ ...props }) => {
    const [createProduct] = useCreateProductMutation();
    const form = useForm<FormType>({
        resolver: zodResolver(CreateProductSchema),
        defaultValues: { title: '', description: '', brand: '', salePrice: 0, retailPrice: 0 },
    });

    const handleSubmit = async ({ salePrice, retailPrice, ...input }: FormType) => {
        try {
            salePrice = typeof salePrice === 'string' ? parseInt(salePrice) : salePrice;
            retailPrice = typeof retailPrice === 'string' ? parseInt(retailPrice) : retailPrice;
            await createProduct({ variables: { input: { ...input, salePrice, retailPrice } } });
            toast.success('Product Created', { description: `product "${input.title}" created successfully` });
        } catch (error: any) {
            console.log('🚀 ~ handleSubmit ~ error:', error);
            toast.error('Error', { description: error.message });
        }
    };
    return (
        <div {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea rows={6} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="col-span-2 grid grid-cols-1 gap-6 md:grid-cols-3">
                        <FormField
                            control={form.control}
                            name="brand"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Brand</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="retailPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Retail Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" min={0} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="salePrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sale Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" min={0} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="col-span-2 grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="col-span-1 md:col-span-3">
                            <Label>Product Dimensions</Label>
                        </div>
                        <FormField
                            control={form.control}
                            name="dimensions.width"
                            render={({ field: { value, ...field } }) => (
                                <FormItem>
                                    <FormLabel>Width</FormLabel>
                                    <FormControl>
                                        <Input type="number" min={0} value={value ?? 0} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dimensions.height"
                            render={({ field: { value, ...field } }) => (
                                <FormItem>
                                    <FormLabel>Height</FormLabel>
                                    <FormControl>
                                        <Input type="number" min={0} value={value ?? 0} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dimensions.depth"
                            render={({ field: { value, ...field } }) => (
                                <FormItem>
                                    <FormLabel>Depth</FormLabel>
                                    <FormControl>
                                        <Input type="number" min={0} value={value ?? 0} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button className="col-span-2" size="lg" variant="default" type="submit">
                        Create Product
                    </Button>
                </form>
            </Form>
        </div>
    );
};
