import { Page } from '@/components/page';
import { Card, CardContent } from '@/components/ui/card';

const OrderSuccessPage = () => {
    return (
        <Page>
            <Card className=" aspect-video ">
                <CardContent className="flex h-full w-full items-center justify-center">
                    <div className="prose space-y-6 text-center">
                        <h1 className="my-0">Order placed successfully</h1>
                        <h4 className="my-0">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum laudantium velit voluptate minus ab atque in voluptatum cupiditate,
                            vel, nesciunt repellendus similique eos autem.
                        </h4>
                        <p className="my-0">Redirecting you in few seconds...</p>
                    </div>
                </CardContent>
            </Card>
        </Page>
    );
};
export default OrderSuccessPage;
