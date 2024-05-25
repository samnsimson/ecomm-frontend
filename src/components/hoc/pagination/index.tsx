'use client';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FC } from 'react';
import ReactPaginate from 'react-paginate';

export const withPagination = <P extends object>(Comp: FC<P>) => {
    return ({ pageCount = 10, ...props }) => {
        const handlePageClick = (data: any) => console.log('page click data', data);
        return (
            <div className="flex flex-col space-y-6">
                <Comp {...(props as P)} />
                <ReactPaginate
                    breakLabel="..."
                    nextLabel={<ChevronRight />}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    pageCount={pageCount}
                    previousLabel={<ChevronLeft />}
                    renderOnZeroPageCount={null}
                    className="mx-auto flex items-center space-x-3"
                    pageClassName={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}
                />
            </div>
        );
    };
};
