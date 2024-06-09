import { SectionTitle } from '@/components/dashboard/section-title';
import { ProfileForm } from '@/components/form/profile';
import { Card, CardContent } from '@/components/ui/card';

const ProfilePage = () => {
    return (
        <div className="space-y-6">
            <SectionTitle title="Profile" description="Manage your profile" />
            <Card>
                <CardContent className="p-6">
                    <ProfileForm />
                </CardContent>
            </Card>
        </div>
    );
};
export default ProfilePage;
