'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CreateProductMutationVariables, useCreateProductMutation } from '@/graphql/generated';
import { FC, HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface CreateProductFormProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const CreateProductForm: FC<CreateProductFormProps> = ({ ...props }) => {
    const form = useForm<CreateProductMutationVariables['input']>({ defaultValues: { title: '', description: '', salePrice: 0, retailPrice: 0 } });
    const [createProduct] = useCreateProductMutation();

    const handleSubmit = async ({ salePrice, retailPrice, ...input }: CreateProductMutationVariables['input']) => {
        try {
            salePrice = typeof salePrice === 'string' ? parseInt(salePrice) : salePrice;
            retailPrice = typeof retailPrice === 'string' ? parseInt(retailPrice) : retailPrice;
            await createProduct({ variables: { input: { ...input, salePrice, retailPrice } } });
            toast.success('Product Created');
        } catch (error) {
            console.log('🚀 ~ handleSubmit ~ error:', error);
            toast.error('Error');
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
                    <Button className="col-span-2" size="lg" variant="default" type="submit">
                        Create Product
                    </Button>
                </form>
            </Form>
        </div>
    );
};
