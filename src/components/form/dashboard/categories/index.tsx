'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCategories } from '@/providers/caetgory.provider';
import { FC, HTMLAttributes, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface BaseCategoryprops extends HTMLAttributes<HTMLDivElement> {
    action: 'create' | 'edit';
}
interface CreateProps extends BaseCategoryprops {
    action: 'create';
}

interface UpdateProps extends BaseCategoryprops {
    action: 'edit';
    id: string;
}

type CategoryFormProps = CreateProps | UpdateProps;

type FormValues = {
    title: string;
    description: string;
};

export const CategoryForm: FC<CategoryFormProps> = ({ action, ...props }) => {
    const { categories, create, update } = useCategories();
    const form = useForm<FormValues>({ defaultValues: { title: '', description: '' } });

    const handler = async (input: FormValues) => {
        try {
            if (action === 'create') {
                await create(input);
                form.reset();
                toast.success('Success', { description: 'Category created successfully!' });
            }
            if (action === 'edit') {
                await update({ id: props.id as string, ...input });
                toast.success('Success', { description: 'Category created updated!' });
            }
        } catch (error) {
            toast.error('Something went wrong', { description: 'Unable to create categroy' });
        }
    };

    useEffect(() => {
        if (action === 'edit') {
            const category = categories.find((x) => x.id === props.id);
            if (category) {
                form.setValue('title', category.title);
                form.setValue('description', category.description ?? '');
            }
        }
    }, [action, categories, props.id, form]);

    return (
        <Form {...form} {...props}>
            <form onSubmit={form.handleSubmit(handler)} className="flex flex-col space-y-6">
                <FormField
                    name="title"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
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
                        </FormItem>
                    )}
                />
                <Button type="submit" size="lg" className="w-full">
                    {action === 'create' ? 'Create category' : 'Update category'}
                </Button>
            </form>
        </Form>
    );
};
