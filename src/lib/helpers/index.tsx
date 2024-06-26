import { GetProductQuery } from '@/graphql/generated';
import moment from 'moment';

export const getProductProperty = (product: GetProductQuery['product']) => {
    const { id, title, slug = '', salePrice } = product;
    return { id, title, slug, salePrice, quantity: 1 };
};

export const localDate = (date: string) => {
    return moment(date).utc().local().format('LL');
};

export const localTime = (date: string) => {
    return moment(date).utc().local().format('LLL');
};

export const relativeTime = (date: string) => {
    return moment(localTime(date), 'LLL').fromNow();
};
