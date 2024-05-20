import { create } from 'zustand';
import { combine, devtools, persist } from 'zustand/middleware';

const initialState: Record<string, any> = {};

export const useStore = create(
    devtools(
        persist(
            combine(initialState, (set) => ({})),
            { name: 'ecomm' },
        ),
    ),
);
