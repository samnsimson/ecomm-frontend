'use client';
import { withPagination } from '@/components/hoc/pagination';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useGetProductsQuery } from '@/graphql/generated';
import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';

interface ProductListProps extends HTMLAttributes<HTMLDivElement> {
    page: number;
}

export const ProductList: FC<ProductListProps> = ({ page, ...props }) => {
    const { data } = useGetProductsQuery({ variables: { take: 10, page } });
    return (
        <div className="flex flex-col space-y-6">
            {data?.products.map((product) => (
                <Card key={product.id} className="prose min-w-full border shadow-none hover:ring hover:ring-primary" {...props}>
                    <CardContent className="flex w-full space-x-3 p-4">
                        <div className="w-1/5"></div>
                        <div className="w-3/5 space-y-1">
                            <h4 className="my-0">
                                <Link href={`/dashboard/products?action=edit&id=${product.id}`} className="no-underline">
                                    {product.title}
                                </Link>
                            </h4>
                            <p className="text-muted-foreground my-0 line-clamp-2 text-sm leading-snug">{product.description}</p>
                            <div className="flex items-center space-x-3">
                                {product.brand && (
                                    <div className="flex items-center space-x-3">
                                        <span className="font-semibold">Brand:</span> <Badge variant="secondary">{product.brand}</Badge>
                                    </div>
                                )}
                                {!!product.categories?.length && (
                                    <div className="flex items-center space-x-3">
                                        <span className="font-semibold">Categories:</span>
                                        {product.categories.map((cat) => (
                                            <Badge key={cat.id} variant="secondary">
                                                {cat.title}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="w-1/5">
                            <h4 className="my-0">Product Price</h4>
                            <ul className="my-0 list-none p-0">
                                <li className="my-0 px-0">Sale: ${product.salePrice}</li>
                                <li className="my-0 px-0">Retail: ${product.retailPrice}</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export const ProductListWithPagination = withPagination(ProductList);
