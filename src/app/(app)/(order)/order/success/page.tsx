import { OrderSuccess } from '@/components/order/success';
import { Page } from '@/components/page';
import { Card, CardContent } from '@/components/ui/card';
import {
    OrderStatus,
    PaymentStatus,
    UpdateOrderDocument,
    UpdateOrderMutation,
    UpdateOrderMutationVariables,
    UpdatePaymentDocument,
    UpdatePaymentMutation,
    UpdatePaymentMutationVariables,
} from '@/graphql/generated';
import { gql } from '@/lib/graphql-client';

const OrderSuccessPage = async ({ searchParams }: Record<string, any>) => {
    const { orderId, paymentId, payment_intent } = searchParams;
    const paymentVar: UpdatePaymentMutationVariables = { input: { id: paymentId, status: PaymentStatus.Paid, paymentIntentId: payment_intent } };
    const ordervar: UpdateOrderMutationVariables = { input: { id: orderId, status: OrderStatus.Created } };
    const { data: paymentData } = await gql.request<UpdatePaymentMutation, UpdatePaymentMutationVariables>(UpdatePaymentDocument, paymentVar);
    const { data: orderData } = await gql.request<UpdateOrderMutation, UpdateOrderMutationVariables>(UpdateOrderDocument, ordervar);
    if (!paymentData) throw new Error('Something went wrong updating payment information!');
    if (!orderData) throw new Error('Something went wrong updating order information!');

    return (
        <Page>
            <Card className=" aspect-video ">
                <CardContent className="flex h-full w-full items-center justify-center">
                    <OrderSuccess {...{ orderId, paymentId }} />
                </CardContent>
            </Card>
        </Page>
    );
};
export default OrderSuccessPage;
