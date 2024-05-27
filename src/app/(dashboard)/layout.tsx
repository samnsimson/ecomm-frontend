import { Container } from '@/components/container';
import { SideNav } from '@/components/side-nav';
import { SignOutComponent } from '@/components/signout';
import { SideNavList } from '@/lib/types';
import { BoxIcon, BoxesIcon, LayoutDashboard, MessageSquareMore, Package, PercentIcon, Settings2, TicketIcon, TruckIcon, User, WalletIcon } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

const navs: Array<SideNavList> = [
    {
        name: 'Dashboard',
        description: 'View all the insights',
        link: '/dashboard',
        icon: <LayoutDashboard />,
    },
    {
        name: 'Products',
        description: 'View & manage products',
        link: '/dashboard/products?action=list',
        icon: <BoxIcon />,
    },
    {
        name: 'Orders',
        description: 'View & manage orders',
        link: '/dashboard/orders',
        icon: <Package />,
    },
    {
        name: 'Categories',
        description: 'View & manage product categories',
        link: '/dashboard/categories',
        icon: <BoxesIcon />,
    },
    {
        name: 'Shippings',
        description: 'View & manage shippings',
        link: '/dashboard/shippings',
        icon: <TruckIcon />,
    },
    {
        name: 'Coupons',
        description: 'Create, view & manage coupons',
        link: '/dashboard/coupons',
        icon: <TicketIcon />,
    },
    {
        name: 'Discounts',
        description: 'Create, view & manage discounts',
        link: '/dashboard/discounts',
        icon: <PercentIcon />,
    },
    {
        name: 'Payments',
        description: 'View & manage payments',
        link: '/dashboard/payments',
        icon: <WalletIcon />,
    },
    {
        name: 'Rating & Reviews',
        description: 'View & manage product reviews',
        link: '/dashboard/rating-and-review',
        icon: <MessageSquareMore />,
    },
    {
        name: 'Settings',
        description: 'View & manage settings',
        link: '/dashboard/settings',
        icon: <Settings2 />,
    },
];

const accountNavs: Array<SideNavList> = [
    {
        name: 'Profile',
        description: 'View & manage settings',
        link: '/dashboard/profile',
        icon: <User />,
    },
];

const DashboardLayout: FC<PropsWithChildren> = ({ children, ...props }) => {
    return (
        <Container className="flex space-x-6 py-6">
            <div className="w-1/4 space-y-6">
                <SideNav navs={navs} title="Store" description="Navigate through store" />
                <SideNav navs={accountNavs} title="Account" description="Manage your account" />
                <SignOutComponent />
            </div>
            <div className="w-3/4">{children}</div>
        </Container>
    );
};
export default DashboardLayout;
