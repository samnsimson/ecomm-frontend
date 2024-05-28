import { AddToCartProduct, StoreState } from '@/lib/types';

export const addItemToCart = (cart: StoreState['cart'], item: AddToCartProduct): StoreState['cart'] => {
    const existing = cart.find((p) => p.id === item.id);
    if (!existing) return [...cart, item];
    existing.quantity += item.quantity;
    existing.salePrice += item.salePrice;
    return cart.map((p) => (p.id === item.id ? existing : p));
};

export const removeItemFromCart = (cart: StoreState['cart'], item: AddToCartProduct): StoreState['cart'] => {
    const existing = cart.find((p) => p.id === item.id);
    if (!existing) return cart;
    else if (existing.quantity === 1) return cart.filter((p) => p.id !== item.id);
    else return cart.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity - item.quantity, salePrice: p.salePrice - item.salePrice } : p));
};
