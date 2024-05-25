import { SettingsSchema } from '@/lib/zod/schemas';
import { z } from 'zod';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type StoreState = {
    settings: z.infer<typeof SettingsSchema>;
};

export type StoreActions = {
    setSettings: (settings: StoreState['settings']) => void;
};

export type Store = StoreState & StoreActions;

const initialState: StoreState = {
    settings: {},
};

export const createStore = (initState: StoreState = initialState) => {
    return create<Store>()(persist((set) => ({ ...initState, setSettings: (settings) => set(() => ({ settings })) }), { name: 'ecomm' }));
};
