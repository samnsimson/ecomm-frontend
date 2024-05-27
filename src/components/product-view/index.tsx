import { GetProductQuery } from '@/graphql/generated';
import { FC, HTMLAttributes } from 'react';

interface ProductViewProps extends HTMLAttributes<HTMLDivElement> {
    product: GetProductQuery['product'];
}

export const ProductView: FC<ProductViewProps> = ({ product, ...props }) => {
    return <div {...props}>{product.title}</div>;
};
