import { SectionTitle } from '@/components/dashboard/section-title';
import { SettingsForm } from '@/components/form/dashboard/settings';
import { Button } from '@/components/ui/button';
import { SaveIcon } from 'lucide-react';

const SettingsPage = () => {
    return (
        <div className="flex flex-col space-y-6">
            <SectionTitle
                title="Settings"
                description="Store setting"
                action={
                    <Button size="lg" startContent={<SaveIcon />}>
                        Save settings
                    </Button>
                }
            />

            <SettingsForm />
        </div>
    );
};
export default SettingsPage;
