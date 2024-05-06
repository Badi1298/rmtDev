import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

type PaginationProps = {
    currentPage: number;
    numberOfPages: number;
    onClick: (direction: 'next' | 'previous') => void;
};

export default function Pagination({
    currentPage,
    numberOfPages,
    onClick,
}: PaginationProps) {
    return (
        <section className="pagination">
            {currentPage !== 1 && (
                <PaginationButton
                    direction="previous"
                    currentPage={currentPage}
                    onClick={() => onClick('previous')}
                />
            )}

            {currentPage < numberOfPages && (
                <PaginationButton
                    direction="next"
                    currentPage={currentPage}
                    onClick={() => onClick('next')}
                />
            )}
        </section>
    );
}

type PaginationButtonProps = {
    direction: 'previous' | 'next';
    currentPage: number;
    onClick: () => void;
};

function PaginationButton({
    direction,
    currentPage,
    onClick,
}: PaginationButtonProps) {
    return (
        <button
            onClick={e => {
                onClick();
                e.currentTarget.blur();
            }}
            className={`pagination__button pagination__button--${direction}`}
        >
            {direction === 'previous' && (
                <>
                    <ArrowLeftIcon /> Page {currentPage - 1}
                </>
            )}

            {direction === 'next' && (
                <>
                    Page {currentPage + 1} <ArrowRightIcon />
                </>
            )}
        </button>
    );
}
