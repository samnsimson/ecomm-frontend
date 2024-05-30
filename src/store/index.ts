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
                addToCart: (id, quantity) => set(({ cart }) => ({ cart: addItemToCart(cart, id, quantity) })),
                removeFromCart: (id, quantity) => set(({ cart }) => ({ cart: removeItemFromCart(cart, id, quantity) })),
            }),
            { name: 'ecomm' },
        ),
    ),
);
