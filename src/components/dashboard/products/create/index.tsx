import { CreateProductForm } from '@/components/form/dashboard/product/create';
import { FC, HTMLAttributes } from 'react';

interface CreateProductProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const CreateProduct: FC<CreateProductProps> = ({ ...props }) => {
    return <CreateProductForm />;
};
