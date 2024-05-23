import { CreateProductForm } from '@/components/form/product/create';
import { Card, CardContent } from '@/components/ui/card';
import { FC, HTMLAttributes } from 'react';

interface CreateProductProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const CreateProduct: FC<CreateProductProps> = ({ ...props }) => {
    return (
        <Card {...props}>
            <CardContent className="p-4">
                <CreateProductForm />
            </CardContent>
        </Card>
    );
};
