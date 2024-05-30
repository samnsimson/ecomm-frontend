import { StoreState } from '@/lib/types';

// export const addItemToCart = (cart: StoreState['cart'], item: AddToCartProduct): StoreState['cart'] => {
//     const existing = cart.find((p) => p.id === item.id);
//     if (!existing) return [...cart, item];
//     existing.quantity += item.quantity;
//     existing.salePrice += item.salePrice;
//     return cart.map((p) => (p.id === item.id ? existing : p));
// };

// export const removeItemFromCart = (cart: StoreState['cart'], item: AddToCartProduct): StoreState['cart'] => {
//     const existing = cart.find((p) => p.id === item.id);
//     if (!existing) return cart;
//     else if (existing.quantity === 1) return cart.filter((p) => p.id !== item.id);
//     else return cart.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity - item.quantity, salePrice: p.salePrice - item.salePrice } : p));
// };

export const addItemToCart = (cart: StoreState['cart'], id: string, quantity: number = 1) => {
    const existing = cart.find((item) => item.id === id);
    if (!existing) return [...cart, { id, quantity }];
    existing.quantity += quantity;
    return cart.map((item) => (item.id === id ? existing : item));
};

export const removeItemFromCart = (cart: StoreState['cart'], id: string, quantity: number = 1) => {
    const existing = cart.find((item) => item.id === id);
    if (!existing) return cart;
    else if (existing.quantity === quantity) return cart.filter((item) => item.id !== id);
    else return cart.map((item) => (item.id === id ? { ...item, quantity: item.quantity - quantity } : item));
};
