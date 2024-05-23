import { CreateProduct } from '@/components/dashboard/products/create';
import { ProductList } from '@/components/dashboard/products/list';
import { SectionTitle } from '@/components/dashboard/section-title';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { NextPage } from 'next';
import Link from 'next/link';
import { FC } from 'react';

const ProductComponent: FC<{ param: Map<string, string> }> = ({ param }) => {
    const action = param.get('action');
    const page = param.get('page');
    const id = param.get('id');

    switch (action) {
        case 'list':
            return <ProductList page={page ? parseInt(page) : 0} />;
        case 'create':
            return <CreateProduct />;
        case 'update':
            return 'Create Product';
        default:
            return null;
    }
};

const ProductsPage: NextPage = ({ searchParams }: any) => {
    const sp = new Map<string, string>(Object.entries(searchParams));
    return (
        <div className="space-y-6">
            <SectionTitle
                title="Products"
                description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci esse nesciunt unde!"
                action={
                    <Link href="/dashboard/products?action=create">
                        <Button size="lg" variant="default" startContent={<PlusIcon />}>
                            Create new product
                        </Button>
                    </Link>
                }
            />
            <ProductComponent param={sp} />
        </div>
    );
};
export default ProductsPage;
