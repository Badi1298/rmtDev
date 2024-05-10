import { ReactNode, createContext } from 'react';

import { useActiveId } from '../lib/hooks';

type ActiveIdContextProviderProps = {
    children: ReactNode;
};

type TActiveIdContext = {
    activeId: number | null;
};

export const ActiveIdContext = createContext<TActiveIdContext | null>(null);

export default function BookmarksContextProvider({
    children,
}: ActiveIdContextProviderProps) {
    const activeId = useActiveId();

    return (
        <ActiveIdContext.Provider
            value={{
                activeId,
            }}
        >
            {children}
        </ActiveIdContext.Provider>
    );
}
