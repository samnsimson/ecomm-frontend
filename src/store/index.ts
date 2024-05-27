import { Store, StoreState } from '@/lib/types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { addItemToCart, removeItemFromCart } from './actions';

const initialState: StoreState = {
    settings: {},
    cart: [],
};

export const useStore = create<Store>()(
    devtools(
        persist(
            (set) => ({
                ...initialState,
                setSettings: (settings) => set(() => ({ settings })),
                addToCart: (item) => set(({ cart }) => ({ cart: addItemToCart(cart, item) })),
                removeFromCart: (item) => set(({ cart }) => ({ cart: removeItemFromCart(cart, item) })),
            }),
            { name: 'ecomm' },
        ),
    ),
);
