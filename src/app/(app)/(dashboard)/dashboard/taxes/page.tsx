import { TaxList } from '@/components/dashboard/taxes/list';
import { Drawer } from '@/components/drawer';
import { TaxesForm } from '@/components/form/dashboard/taxes';
import { Page } from '@/components/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GetTaxesDocument, GetTaxesQuery, GetTaxesQueryVariables } from '@/graphql/generated';
import { gql } from '@/lib/graphql-client';
import { TaxProvider } from '@/providers/tax.provider';
import { PlusIcon } from 'lucide-react';
import { NextPage } from 'next';
import { FC } from 'react';

const TriggerComp: FC = () => {
    return (
        <Button size="lg" startContent={<PlusIcon />}>
            Create new tax
        </Button>
    );
};

const PageAction: FC = () => {
    return (
        <Drawer title="Create Taxes" description="Create your taxes here" size="medium" trigger={<TriggerComp />}>
            <TaxesForm action="create" />
        </Drawer>
    );
};

const TaxesPage: NextPage = async () => {
    const { data } = await gql.fetch<GetTaxesQuery, GetTaxesQueryVariables>(GetTaxesDocument);
    if (!data) throw new Error('Unable to fetch taxes');
    return (
        <TaxProvider initialData={data.taxes}>
            <Page title="Taxes" description="Manage Taxes" action={<PageAction />}>
                <Card>
                    <CardHeader>
                        <CardTitle>All Taxes</CardTitle>
                        <CardDescription>Manage Taxes</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <TaxList />
                    </CardContent>
                </Card>
            </Page>
        </TaxProvider>
    );
};
export default TaxesPage;
export const dynamic = 'force-dynamic';
