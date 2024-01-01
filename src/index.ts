import {useEffect, useReducer} from "react";

type SetupStore<T> = (set: Updater<T>) => Readonly<T>;
type Updater<T> = (updater: (store: T) => Partial<T>) => void;
type Selector<T> = (store: T) => T[keyof T];

/**
 * Creates a global store that can be used anywhere in the app
 * This expects a function that returns an object with the store definition
 * The function receives a setter function that can be used to update the store
 * @example
 * const useCounter = createStore((set) => ({
 *    count: 0,
 *    increment: () => set((store) => ({ count: store.count + 1 })),
 * )})
 * @param setupStore - A function that returns the store definition
 * @returns A hook that can be used to access/update the store
 */
export function createStore<T extends Record<string, any>>(setupStore: SetupStore<T>) {
    const store: T = setupStore(() => {}) as T;

    function useStore<K extends Selector<T>>(selector: K): ReturnType<K>;
    function useStore(selector?: undefined): T;

    function useStore<K extends Selector<T>>(selector?: K): ReturnType<K> | T {
        const [, renderUI] = useReducer((c) => c + 1, 0)
        function setter(updater: (store: T) => Partial<T>) {
            const newStore = updater(store);
            Object.assign(store, newStore);
            renderUI();
        }
        useEffect(() => {
            const newStore = setupStore(setter);
            Object.assign(store, newStore);
            renderUI();
        }, []);
        return selector ? selector(store): store;
    }
    return useStore;
}
