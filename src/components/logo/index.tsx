import { cn } from '@/libs/utils/cn';
import { Button } from '@nextui-org/react';
import { StarIcon } from 'lucide-react';
import { Lobster as Font } from 'next/font/google';
import Link from 'next/link';

const font = Font({ weight: '400', subsets: ['latin'] });

const Logo = () => {
    return (
        <span className="inline-block">
            <Link href="/" className="flex items-center space-x-2 px-2.5 py-2">
                <Button radius="full" isIconOnly color="danger" disabled disableAnimation disableRipple className="ring ring-primary ring-offset-2">
                    <StarIcon strokeWidth={2} size={32} className="fill-primary stroke-white" />
                </Button>
                <span className={cn(font.className, 'inset-4 text-[42px] text-primary')}>Meridian</span>
            </Link>
        </span>
    );
};
export default Logo;
