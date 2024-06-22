import { ProductListWithPagination } from '@/components/dashboard/products/list';
import { Page } from '@/components/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusIcon } from 'lucide-react';
import { NextPage } from 'next';
import Link from 'next/link';
import { FC } from 'react';

const ProductPageAction: FC = () => {
    return (
        <Link href="/dashboard/products/create">
            <Button size="lg" variant="default" startContent={<PlusIcon />}>
                Create new product
            </Button>
        </Link>
    );
};

const ProductsPage: NextPage = ({ searchParams }: any) => {
    return (
        <div className="space-y-6">
            <Page
                title="Products"
                description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci esse nesciunt unde!"
                action={<ProductPageAction />}
            >
                <Card className="divide-y">
                    <CardHeader>
                        <CardTitle>All products</CardTitle>
                        <CardDescription>List of all products</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 pb-6">
                        <ProductListWithPagination page={searchParams['page'] ?? 0} />
                    </CardContent>
                </Card>
            </Page>
        </div>
    );
};
export default ProductsPage;
export const dynamic = 'force-dynamic';
