'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCategories } from '@/providers/caetgory.provider';
import { FC, HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface CreateCategoryFormProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

type FormValues = {
    title: string;
    description: string;
};

export const CreateCategoryForm: FC<CreateCategoryFormProps> = ({ ...props }) => {
    const { create } = useCategories();
    const form = useForm<FormValues>({ defaultValues: { title: '', description: '' } });
    const handler = async (input: FormValues) => {
        try {
            await create(input);
            form.reset();
            toast.success('Success', { description: 'Category created successfully!' });
        } catch (error) {
            toast.error('Something went wrong', { description: 'Unable to create categroy' });
        }
    };

    return (
        <Form {...form} {...props}>
            <form onSubmit={form.handleSubmit(handler)} className="space-y-6">
                <Card>
                    <CardContent className="flex flex-col space-y-6 p-6">
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
                            Submit
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </Form>
    );
};
