import { GetProductQuery } from '@/graphql/generated';
import { FC, HTMLAttributes } from 'react';
import { AspectRatio } from '../ui/aspect-ratio';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { List, ListItem } from '../list';
import { AddToCart } from '../add-to-cart';
import { Button } from '../ui/button';
import { HeartIcon } from 'lucide-react';
import { getProductProperty } from '@/lib/helpers';
import { SectionTitle } from '../dashboard/section-title';
import { RetailPrice, SalePrice } from '../price';
import Link from 'next/link';

interface ProductViewProps extends HTMLAttributes<HTMLDivElement> {
    product: GetProductQuery['product'];
}

export const ProductView: FC<ProductViewProps> = ({ product, ...props }) => {
    return (
        <div {...props} className="space-y-10">
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
            <div className="grid grid-cols-4 gap-6">
                <div className="col-span-4">
                    <SectionTitle title="Related Products" />
                </div>
                {product.realtedProducts.map((rp) => (
                    <Card key={rp.id}>
                        <CardContent className="flex flex-col space-y-3 p-3">
                            <AspectRatio ratio={1 / 1} className="bg-muted" />
                            <Link href={`/shop/${rp.slug}`} className="group prose">
                                <h3 className="m-0 group-hover:text-primary">{rp.title}</h3>
                                <p className="m-0 line-clamp-2 text-sm leading-5">{rp.description}</p>
                            </Link>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between p-3">
                            <div className="flex items-center space-x-3 font-semibold">
                                <SalePrice price={rp.salePrice} />
                                <RetailPrice price={rp.retailPrice} />
                            </div>
                            <div className="flex items-center space-x-3">
                                <Button variant="warning" size="icon">
                                    <HeartIcon size={18} />
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};
