import { ReactNode, createContext, useEffect } from 'react';

import { useJobItems } from '../lib/hooks';
import { useLocalStorage } from 'usehooks-ts';

import { JobItemExpanded } from '../lib/types';

type BookmarksContextProviderProps = {
    children: ReactNode;
};

type TBookmarksContext = {
    isLoading: boolean;
    bookmarkedIds: number[];
    bookmarkedJobItems: JobItemExpanded[];
    handleBookmarkItem: (id: number) => void;
};

export const BookmarksContext = createContext<TBookmarksContext | null>(null);

export default function BookmarksContextProvider({
    children,
}: BookmarksContextProviderProps) {
    const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
        'bookmarkedIds',
        []
    );

    const { jobItems: bookmarkedJobItems, isLoading } =
        useJobItems(bookmarkedIds);

    useEffect(() => {
        localStorage.setItem('bookmarkedIds', JSON.stringify(bookmarkedIds));
    }, [bookmarkedIds]);

    const handleBookmarkItem = (id: number): void => {
        if (bookmarkedIds.includes(id)) {
            setBookmarkedIds(prev =>
                prev.filter(currentId => currentId !== id)
            );
        } else {
            setBookmarkedIds(prev => [...prev, id]);
        }
    };

    return (
        <BookmarksContext.Provider
            value={{
                bookmarkedIds,
                handleBookmarkItem,
                bookmarkedJobItems,
                isLoading,
            }}
        >
            {children}
        </BookmarksContext.Provider>
    );
}
