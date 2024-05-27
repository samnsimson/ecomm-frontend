'use client';
import { AddToCart } from '@/components/add-to-cart';
import { withPagination } from '@/components/hoc/pagination';
import { List, ListItem } from '@/components/list';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useGetProductsQuery } from '@/graphql/generated';
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
                    <Card className="h-full divide-y hover:shadow-lg">
                        <CardContent className="prose flex flex-1 flex-col p-4">
                            <AspectRatio ratio={1 / 1} className="rounded bg-muted"></AspectRatio>
                            <Link href={`/shop/${pdt.slug}`} className="group no-underline">
                                <div className="min-h-[77px] flex-1 space-y-0.5 pt-4">
                                    <h4 className="my-0 group-hover:text-primary">{pdt.title}</h4>
                                    <p className="my-0 line-clamp-2 text-sm leading-tight text-muted-foreground">{pdt.description}</p>
                                </div>
                            </Link>
                        </CardContent>
                        <CardFooter className="prose flex items-center justify-between p-4">
                            <div className="flex items-center space-x-3">
                                <h2 className="my-0">${pdt.salePrice}</h2>
                                <p className="my-0 line-through">${pdt.retailPrice}</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Button variant="secondary" size="icon">
                                    <HeartIcon size={18} />
                                </Button>
                                <AddToCart />
                            </div>
                        </CardFooter>
                    </Card>
                </ListItem>
            ))}
        </List>
    );
};

export const ProductListWithPagination = withPagination(ProductList);
