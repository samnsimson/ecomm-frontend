import { cn } from '@/lib/utils';
import { StarIcon } from 'lucide-react';
import { Lobster as Font } from 'next/font/google';
import Link from 'next/link';
import { Button } from '../ui/button';

const font = Font({ weight: '400', subsets: ['latin'] });

const Logo = () => {
    return (
        <span className="inline-block">
            <Link href="/" className="flex items-center space-x-2 px-2.5 py-2">
                <Button variant="destructive" size="icon" className="rounded-full ring ring-blue-600 ring-offset-2">
                    <StarIcon strokeWidth={2} size={32} className="fill-blue-600 stroke-white" />
                </Button>
                <span className={cn(font.className, 'inset-4 text-[42px] text-blue-600')}>Meridian</span>
            </Link>
        </span>
    );
};
export default Logo;
