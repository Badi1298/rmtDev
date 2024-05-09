import { ReactNode, createContext, useState } from "react";

type BookmarksContextProviderProps = {
    children: ReactNode;
};

type BookmarksContextValues = {
    bookmarkedIds: number[];
    handleBookmarkItem: (id: number) => void;
};

export const BookmarksContext = createContext<BookmarksContextValues | null>(
    null
);

export default function BookmarksContextProvider({
    children,
}: BookmarksContextProviderProps) {
    const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);

    console.log(bookmarkedIds);

    const handleBookmarkItem = (id: number): void => {
        if (bookmarkedIds.includes(id)) {
            setBookmarkedIds((prev) =>
                prev.filter((currentId) => currentId !== id)
            );
        } else {
            setBookmarkedIds((prev) => [...prev, id]);
        }
    };

    return (
        <BookmarksContext.Provider
            value={
                {
                    bookmarkedIds,
                    handleBookmarkItem,
                } as BookmarksContextValues
            }
        >
            {children}
        </BookmarksContext.Provider>
    );
}
