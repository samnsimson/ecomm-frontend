'use client';

import { useGetSettingsQuery } from '@/graphql/generated';
import { Store, createStore } from '@/store';
import { FC, PropsWithChildren, createContext, useContext, useRef } from 'react';
import { StoreApi, useStore as useZustand } from 'zustand';

export const StoreContext = createContext<StoreApi<Store> | null>(null);

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
    const storeRef = useRef<StoreApi<Store>>();
    const { data } = useGetSettingsQuery();
    if (!storeRef.current) storeRef.current = createStore();
    if (data) storeRef.current.setState((state) => ({ ...state, settings: data.setting }));

    return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>;
};

export const useStore = <T,>(selector: (store: Store) => T): T => {
    const ctx = useContext(StoreContext);
    if (!ctx) throw new Error(`useStore must be use within CounterStoreProvider`);
    return useZustand(ctx, selector);
};
