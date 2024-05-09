import { useBookmarksContext } from '../lib/hooks';

import { BookmarkFilledIcon } from '@radix-ui/react-icons';

export default function BookmarkIcon({ id }: { id: number }) {
    const { bookmarkedIds, handleBookmarkItem } = useBookmarksContext();

    return (
        <button
            onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                handleBookmarkItem(id);
            }}
            className="bookmark-btn"
        >
            <BookmarkFilledIcon
                className={bookmarkedIds.includes(id) ? 'filled' : ''}
            />
        </button>
    );
}
