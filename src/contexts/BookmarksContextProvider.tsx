import { ReactNode, createContext, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

type BookmarksContextProviderProps = {
    children: ReactNode;
};

type TBookmarksContext = {
    bookmarkedIds: number[];
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
            }}
        >
            {children}
        </BookmarksContext.Provider>
    );
}
