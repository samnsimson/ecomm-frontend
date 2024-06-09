import { TaxList } from '@/components/dashboard/taxes/list';
import { TaxesForm } from '@/components/form/dashboard/taxes';
import { Page } from '@/components/page';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TaxProvider } from '@/providers/tax.provider';

const TaxesPage = () => {
    return (
        <Page title="Taxes" description="Manage Taxes">
            <TaxProvider>
                <Card className="divide-y">
                    <CardContent className="p-6">
                        <TaxesForm />
                    </CardContent>
                </Card>
                <Card className="divide-y">
                    <CardHeader>
                        <CardTitle>All Taxes</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <TaxList />
                    </CardContent>
                </Card>
            </TaxProvider>
        </Page>
    );
};
export default TaxesPage;
