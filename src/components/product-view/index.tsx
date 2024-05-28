import { GetProductQuery } from '@/graphql/generated';
import { FC, HTMLAttributes } from 'react';
import { AspectRatio } from '../ui/aspect-ratio';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { List, ListItem } from '../list';
import { AddToCart } from '../add-to-cart';
import { Button } from '../ui/button';
import { HeartIcon } from 'lucide-react';
import { AddToCartProduct } from '@/lib/types';
import { getProductProperty } from '@/lib/helpers';

interface ProductViewProps extends HTMLAttributes<HTMLDivElement> {
    product: GetProductQuery['product'];
}

export const ProductView: FC<ProductViewProps> = ({ product, ...props }) => {
    return (
        <div {...props}>
            <div className="grid grid-cols-2 gap-6">
                <div className="col-span-1 flex flex-col space-y-6">
                    <AspectRatio ratio={1 / 1}>
                        <Card className="h-full w-full p-4">
                            <CardContent className="h-full w-full rounded bg-muted" />
                        </Card>
                    </AspectRatio>
                    <List className="grid grid-cols-4 gap-6">
                        {Array.from({ length: 4 }, (_, key) => (
                            <AspectRatio key={key}>
                                <Card className="h-full w-full p-2">
                                    <CardContent className="h-full w-full rounded bg-muted" />
                                </Card>
                            </AspectRatio>
                        ))}
                    </List>
                </div>
                <div className="col-span-1 space-y-6">
                    <Card className="divide-y">
                        <CardHeader>
                            <CardTitle>{product.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 py-6">
                            <CardDescription className="text-base">{product.description}</CardDescription>
                            <div className="prose-2xl flex items-baseline space-x-3">
                                <span>Price:</span> <h2 className="my-0 font-semibold">${product.salePrice}</h2>{' '}
                                <p className="my-0 text-muted-foreground line-through">${product.retailPrice}</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex items-center justify-evenly space-x-6 p-6">
                            <AddToCart size="xl" fullWidth product={getProductProperty(product)} />
                            <Button className="w-full" size="xl" variant="secondary" startContent={<HeartIcon />}>
                                Add to wishlist
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card className="divide-y">
                        <CardHeader>
                            <CardTitle>Product Specification</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <List>
                                <ListItem className="flex items-center px-6 py-3">
                                    <p className="w-1/3">Brand:</p>
                                    <p className="w-2/3">
                                        <b>{product.brand}</b>
                                    </p>
                                </ListItem>
                                <ListItem className="flex items-center px-6 py-3">
                                    <p className="w-1/3">Width:</p>
                                    <p className="w-2/3">{product.dimensions.width} Inches</p>
                                </ListItem>
                                <ListItem className="flex items-center px-6 py-3">
                                    <p className="w-1/3">Height:</p>
                                    <p className="w-2/3">{product.dimensions.height} Inches</p>
                                </ListItem>
                                <ListItem className="flex items-center px-6 py-3">
                                    <p className="w-1/3">Depth:</p>
                                    <p className="w-2/3">{product.dimensions.depth} Inches</p>
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
