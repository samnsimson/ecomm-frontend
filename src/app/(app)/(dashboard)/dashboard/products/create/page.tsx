import { PageAction } from '@/components/dashboard/products/page-action';
import { ProductForm } from '@/components/form/dashboard/product/create';
import { Page } from '@/components/page';
import { NextPage } from 'next';

const CreateProductPage: NextPage = ({ searchParams }: any) => {
    return (
        <Page title="Create product" description="Create a new product" action={<PageAction />}>
            <ProductForm isEditMode={false} />
        </Page>
    );
};
export default CreateProductPage;
export const dynamic = 'force-dynamic';
