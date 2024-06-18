'use client';
import { AddToCart } from '@/components/add-to-cart';
import { withPagination } from '@/components/hoc/pagination';
import { List, ListItem } from '@/components/list';
import { RetailPrice, SalePrice } from '@/components/price';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useGetProductsQuery } from '@/graphql/generated';
import { getProductProperty } from '@/lib/helpers';
import { HeartIcon } from 'lucide-react';
import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';

interface ProductListProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const ProductList: FC<ProductListProps> = ({ ...props }) => {
    const { data } = useGetProductsQuery();
    return (
        <List className="grid grid-cols-3 gap-6" {...props}>
            {data?.products.map((pdt) => (
                <ListItem key={pdt.id}>
                    <Card className="h-full divide-y overflow-hidden border-0 hover:shadow-xl">
                        <CardContent className="prose flex flex-1 flex-col border-t-0 p-4">
                            <AspectRatio ratio={1 / 1} className="rounded bg-muted dark:bg-accent"></AspectRatio>
                            <Link href={`/shop/${pdt.slug}`} className="group no-underline">
                                <div className="min-h-[77px] flex-1 space-y-0.5 pt-4">
                                    <h4 className="my-0 text-foreground group-hover:text-primary">{pdt.title}</h4>
                                    <p className="my-0 line-clamp-2 text-sm leading-tight text-muted-foreground">{pdt.description}</p>
                                </div>
                            </Link>
                        </CardContent>
                        <CardFooter className="prose flex items-center justify-between p-4">
                            <div className="flex items-center space-x-3">
                                <SalePrice price={pdt.salePrice} />
                                <RetailPrice price={pdt.retailPrice} />
                            </div>
                            <div className="flex items-center space-x-3">
                                <Button variant="warning" size="icon">
                                    <HeartIcon size={18} />
                                </Button>
                                <AddToCart id={pdt.id} product={getProductProperty(pdt)} />
                            </div>
                        </CardFooter>
                    </Card>
                </ListItem>
            ))}
        </List>
    );
};

export const ProductListWithPagination = withPagination(ProductList);
