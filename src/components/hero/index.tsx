import { FC, HTMLAttributes } from 'react';
import { Container } from '../container';
import { Button } from '@nextui-org/react';
import { ArrowRightIcon } from 'lucide-react';

interface HeroProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const Hero: FC<HeroProps> = ({ ...props }) => {
    return (
        <div {...props} className="flex-grow flex relative">
            <Container className="text-white realtive">
                <div className="w-1/3 space-y-6 absolute top-1/4">
                    <h1 className="text-[76px] font-black leading-[70px] tracking-wider">
                        <span className="text-warning">Still not</span> buying?
                    </h1>
                    <div className="space-y-2">
                        <h2 className="text-[46px] font-bold">We are your best options</h2>
                        <p className="text-[20px]">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem mollitia eaque, aspernatur neque fugiat, numquam rem
                            praesentium odit molestiae perferendis porro ea repellat dolore eos, facere eveniet. Animi, ipsa aut.
                        </p>
                    </div>
                    <Button endContent={<ArrowRightIcon />} size="lg" color="warning" radius="full" className="font-bold">
                        Shop now
                    </Button>
                </div>
            </Container>
        </div>
    );
};
