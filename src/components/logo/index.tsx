import { cn } from '@/libs/utils/cn';
import { Button } from '@nextui-org/react';
import { StarIcon } from 'lucide-react';
import { Lobster as Font } from 'next/font/google';

const font = Font({ weight: '400', subsets: ['latin'] });

const Logo = () => {
    return (
        <span className="inline-block">
            <span className="flex items-center space-x-2 px-2.5 py-2">
                <Button radius="full" isIconOnly color="danger" disabled disableAnimation disableRipple className="ring ring-primary ring-offset-2">
                    <StarIcon strokeWidth={2} size={32} className="fill-primary stroke-white" />
                </Button>
                <p className={cn(font.className, 'text-[42px] text-primary inset-4')}>Meridian</p>
            </span>
        </span>
    );
};
export default Logo;
