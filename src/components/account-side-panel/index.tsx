'use client';
import { Listbox, ListboxItem } from '@nextui-org/react';
import { BoxIcon, ChevronRight, User2Icon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const AccountSidePanel = () => {
    const [selected, setSelected] = useState(new Set(['profile']));
    const router = useRouter();

    useEffect(() => {
        const key = Array.from(selected).pop();
        if (!key) return;
        switch (key) {
            case 'profile':
                router.push('/account/profile');
                break;
            case 'orders':
                router.push('/account/orders');
                break;
            default:
                break;
        }
    }, [selected, router]);

    return (
        <Listbox
            variant="solid"
            color="primary"
            className="rounded border border-default bg-white p-3"
            itemClasses={{ description: '' }}
            selectionMode="single"
            label="account section"
            selectedKeys={selected}
            onSelectionChange={setSelected as any}
            disallowEmptySelection
        >
            <ListboxItem key="profile" description="Manage your profile" startContent={<User2Icon />}>
                Profile
            </ListboxItem>
            <ListboxItem key="orders" description="Manage your orders" startContent={<BoxIcon />}>
                Orders
            </ListboxItem>
        </Listbox>
    );
};
