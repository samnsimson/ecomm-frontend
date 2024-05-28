import { GetProductQuery } from '@/graphql/generated';
import { AddToCartProduct } from '../types';

export const getProductProperty = (product: GetProductQuery['product']): AddToCartProduct => {
    const { id, title, slug = '', salePrice } = product;
    return { id, title, slug, salePrice, quantity: 1 };
};
