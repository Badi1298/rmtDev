import { useContext } from "react";

import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";

type BookmarksContextValues = {
    bookmarkedIds: number[];
    handleBookmarkItem: (id: number) => void;
};

export default function BookmarkIcon({ id }: { id: number }) {
    const { bookmarkedIds, handleBookmarkItem } =
        useContext<BookmarksContextValues | null>(BookmarksContext);

    return (
        <button onClick={() => handleBookmarkItem(id)} className="bookmark-btn">
            <BookmarkFilledIcon
                className={bookmarkedIds.includes(id) ? "filled" : ""}
            />
        </button>
    );
}
