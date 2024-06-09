import { SideNav } from '@/components/side-nav';
import { Container } from '@/components/container';
import { FC, PropsWithChildren } from 'react';
import { SideNavList } from '@/lib/types';
import { BookmarkIcon, BoxIcon, User } from 'lucide-react';
import { SignOutComponent } from '@/components/signout';

const navs: Array<SideNavList> = [
    {
        name: 'Profile',
        description: 'Manage your profile',
        link: '/account/profile',
        icon: <User />,
    },
    {
        name: 'Orders',
        description: 'Manage your orders',
        link: '/account/orders',
        icon: <BoxIcon />,
    },
    {
        name: 'Wishlist',
        description: 'View wishlisted items',
        link: '/account/wishlist',
        icon: <BookmarkIcon />,
    },
];

const AccountLayout: FC<PropsWithChildren> = ({ children, ...props }) => {
    return (
        <Container className="flex space-x-6 py-6">
            <div className="flex w-1/4 flex-col space-y-6">
                <SideNav navs={navs} />
                <SignOutComponent />
            </div>
            <div className="w-3/4">{children}</div>
        </Container>
    );
};
export default AccountLayout;
