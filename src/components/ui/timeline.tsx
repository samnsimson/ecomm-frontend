import { ClockIcon } from 'lucide-react';
import { FC, HTMLAttributes } from 'react';

interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
    [x: string]: any;
}

export const Timeline: FC<TimelineProps> = ({ ...props }) => {
    return (
        <ol className="relative flex flex-col space-y-6 border-s border-primary dark:border-primary" {...props}>
            <li className="ms-6">
                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-8 ring-white dark:bg-primary dark:ring-gray-900">
                    <ClockIcon size={16} className="text-background" />
                </span>
                <time className="mb-1 text-base font-normal leading-none text-secondary-foreground dark:text-gray-500">February 2022</time>
                <h3 className="text-lg font-semibold text-foreground dark:text-foreground">Application UI code in Tailwind CSS</h3>
            </li>
            <li className="ms-6">
                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-8 ring-white dark:bg-primary dark:ring-gray-900">
                    <ClockIcon size={16} className="text-background" />
                </span>
                <time className="mb-1 text-base font-normal leading-none text-secondary-foreground dark:text-gray-500">March 2022</time>
                <h3 className="text-lg font-semibold text-foreground dark:text-foreground">Marketing UI design in Figma</h3>
            </li>
            <li className="ms-6">
                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-8 ring-white dark:bg-primary dark:ring-gray-900">
                    <ClockIcon size={16} className="text-background" />
                </span>
                <time className="mb-1 text-base font-normal leading-none text-secondary-foreground dark:text-gray-500">April 2022</time>
                <h3 className="text-lg font-semibold text-foreground dark:text-foreground">E-Commerce UI code in Tailwind CSS</h3>
            </li>
        </ol>
    );
};
