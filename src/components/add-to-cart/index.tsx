import { FC, HTMLAttributes } from 'react';
import { Button } from '../ui/button';
import { ShoppingCartIcon } from 'lucide-react';

interface AddToCartProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const AddToCart: FC<AddToCartProps> = ({ ...props }) => {
    return (
        <div {...props}>
            <Button variant="default" startContent={<ShoppingCartIcon size={18} />}>
                Add to cart
            </Button>
        </div>
    );
};
