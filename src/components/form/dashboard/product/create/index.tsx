'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { GetProductQuery, useCreateProductMutation, useUpdateProductMutation } from '@/graphql/generated';
import { CreateProductSchema } from '@/lib/zod/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, HTMLAttributes, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useShipping } from '@/providers/shipping.provider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCategories } from '@/providers/caetgory.provider';
import MultiSelect from '@/components/ui/multi-select';
import { title } from 'process';

interface BaseProps extends HTMLAttributes<HTMLDivElement> {
    isEditMode: boolean;
}

interface EditModeProps extends BaseProps {
    isEditMode: true;
    product: GetProductQuery['product'];
}

interface ViewModeProps extends BaseProps {
    isEditMode: false;
}

type ProductFormProps = EditModeProps | ViewModeProps;

type FormType = z.infer<typeof CreateProductSchema>;

const getDefaultFormValue = (isEditMode: boolean, props: ProductFormProps): FormType => {
    if (isEditMode && 'product' in props) {
        return {
            title: props.product.title,
            description: props.product.description ?? '',
            brand: props.product.brand ?? '',
            retailPrice: props.product.retailPrice,
            salePrice: props.product.salePrice,
            shipping: { id: props.product['shipping'] ? props.product.shipping.id : '' },
            dimensions: { width: props.product.dimensions.width, height: props.product.dimensions.height, depth: props.product.dimensions.depth },
        };
    } else {
        return { title: '', description: '', brand: '', salePrice: 0, retailPrice: 0 };
    }
};

export const ProductForm: FC<ProductFormProps> = ({ isEditMode, ...props }) => {
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [productId, setProductId] = useState<string | undefined>(undefined);
    const { shippings } = useShipping();
    const { categories } = useCategories();

    const form = useForm<FormType>({
        resolver: zodResolver(CreateProductSchema),
        defaultValues: getDefaultFormValue(isEditMode, props as any),
    });

    const handleSubmit = async ({ salePrice, retailPrice, ...input }: FormType) => {
        try {
            salePrice = typeof salePrice === 'string' ? parseInt(salePrice) : salePrice;
            retailPrice = typeof retailPrice === 'string' ? parseInt(retailPrice) : retailPrice;
            if (isEditMode) await updateProduct({ variables: { input: { ...input, id: productId as string, salePrice, retailPrice } } });
            else await createProduct({ variables: { input: { ...input, salePrice, retailPrice } } });
            const successMessage = `Product ${isEditMode ? 'Updated' : 'Created'}`;
            const successDescription = `product "${input.title}" ${isEditMode ? 'updated' : 'created'} successfully`;
            toast.success(successMessage, { description: successDescription });
            if (!isEditMode) form.reset();
        } catch (error: any) {
            console.log('🚀 ~ handleSubmit ~ error:', error);
            toast.error('Error', { description: error.message });
        }
    };

    useEffect(() => {
        if (isEditMode) {
            const { product } = props as EditModeProps;
            setProductId(product.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditMode]);

    return (
        <Form {...form} {...props}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <Card>
                    <CardContent className="grid grid-cols-2 gap-6 p-6">
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
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Product Specification</CardTitle>
                    </CardHeader>
                    <CardContent className="col-span-2 grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="col-span-3 grid grid-cols-2 gap-6">
                            <FormField
                                name="categories"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <MultiSelect
                                                options={categories.map((cat) => ({ label: cat.title, value: cat.id }))}
                                                placeholder="Select a product category"
                                                emptyIndicator="No items to select"
                                                hidePlaceholderWhenSelected={true}
                                                badgeClassName="p-1 px-2 bg-secondary text-secondary-foreground hover:text-primary-foreground"
                                                onChange={(e) => field.onChange(e.map((x) => ({ id: x.value })))}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="shipping.id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Shipping Method</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Shipping Method" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {shippings.map(({ id, title }) => (
                                                        <SelectItem key={id} value={id}>
                                                            {title}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
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
                    </CardContent>
                </Card>

                <Button className="col-span-2 w-full" size="lg" variant="default" type="submit">
                    {isEditMode ? 'Update product' : 'Create Product'}
                </Button>
            </form>
        </Form>
    );
};
