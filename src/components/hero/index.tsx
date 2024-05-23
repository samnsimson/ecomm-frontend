import { FC, HTMLAttributes } from 'react';
import { Container } from '../container';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from '../ui/button';

interface HeroProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const Hero: FC<HeroProps> = ({ ...props }) => {
    return (
        <div {...props} className="relative flex">
            <Container className="realtive text-white">
                <div className="w-1/2 space-y-6">
                    <h1 className="text-[76px] font-black leading-[70px] tracking-wider">
                        <span className="text-amber-500">Still not</span> buying?
                    </h1>
                    <div className="space-y-2">
                        <h2 className="text-[46px] font-bold">We are your best options</h2>
                        <p className="text-[20px]">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem mollitia eaque, aspernatur neque fugiat, numquam rem
                            praesentium odit molestiae perferendis porro ea repellat dolore eos, facere eveniet. Animi, ipsa aut.
                        </p>
                    </div>
                    <Button size="lg" variant="secondary" className="flex items-center space-x-3 bg-amber-500 font-bold" endContent={<ArrowRightIcon />}>
                        Shop now
                    </Button>
                </div>
            </Container>
        </div>
    );
};
