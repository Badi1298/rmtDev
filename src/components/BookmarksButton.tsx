import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import { TriangleDownIcon } from '@radix-ui/react-icons';

import BookmarksPopover from './BookmarksPopover';

export default function BookmarksButton() {
    const bookmarksRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);

    const handleClickOutside = () => {
        setIsOpen(false);
    };

    useOnClickOutside(bookmarksRef, handleClickOutside);

    return (
        <section ref={bookmarksRef}>
            <button
                className="bookmarks-btn"
                onClick={() => setIsOpen(prev => !prev)}
            >
                Bookmarks <TriangleDownIcon />
            </button>

            {isOpen && <BookmarksPopover />}
        </section>
    );
}
