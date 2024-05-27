import { Page } from '@/components/page';
import { ProductListWithPagination } from '@/components/shop/product/list';
import { NextPage } from 'next';

const ShopPage: NextPage = () => {
    return (
        <Page title="Shop" description="Shop all products">
            <ProductListWithPagination />
        </Page>
    );
};
export default ShopPage;
