import { GetProductQuery } from '@/graphql/generated';
import { format, parseISO } from 'date-fns';
import moment from 'moment';

export const getProductProperty = (product: GetProductQuery['product']) => {
    const { id, title, slug = '', salePrice } = product;
    return { id, title, slug, salePrice, quantity: 1 };
};

export const localDate = (date: string) => {
    if (!date) return '-';
    const dateString = new Date(date);
    const formattedDate = format(dateString, 'MMMM d, yyyy');
    return formattedDate;
};

export const localTime = (date: string) => {
    if (!date) return '-';
    return moment(date).utc().local().format('LLL');
};

export const relativeTime = (date: string) => {
    if (!date) return '-';
    return moment(localTime(date), 'LLL').fromNow();
};
