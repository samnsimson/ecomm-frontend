import { Container } from '@/components/container';
import { SideNav } from '@/components/side-nav';
import { SideNavList } from '@/lib/types';
import { BoxIcon, BoxesIcon, LayoutDashboard, MessageSquareMore, Package, Settings2, TruckIcon, WalletIcon } from 'lucide-react';
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
        link: '/dashboard/orders',
        icon: <BoxesIcon />,
    },
    {
        name: 'Shippings',
        description: 'View & manage shippings',
        link: '/dashboard/shippings',
        icon: <TruckIcon />,
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

const DashboardLayout: FC<PropsWithChildren> = ({ children, ...props }) => {
    return (
        <Container className="flex space-x-6 py-6">
            <div className="w-1/4">
                <SideNav navs={navs} />
            </div>
            <div className="w-3/4">{children}</div>
        </Container>
    );
};
export default DashboardLayout;
