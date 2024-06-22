import { redirect } from 'next/navigation';

const AccountPage = () => redirect('/account/profile');
export default AccountPage;
export const dynamic = 'force-dynamic';
