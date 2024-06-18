import { ProfileForm } from '@/components/form/profile';

const ProfilePage = async () => {
    return (
        <div className="border-default rounded border bg-accent p-4">
            <ProfileForm />
        </div>
    );
};
export default ProfilePage;
