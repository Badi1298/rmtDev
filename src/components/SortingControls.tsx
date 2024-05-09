import { ReactNode } from "react";

import { TSortBy } from "../lib/types";
import { SortingOptions } from "../lib/enums";

type SortingControlsProps = {
    sortBy: TSortBy;
    onClick: (newSortBy: TSortBy) => void;
};

export default function SortingControls({
    sortBy,
    onClick,
}: SortingControlsProps) {
    return (
        <section className="sorting">
            <i className="fa-solid fa-arrow-down-short-wide"></i>
            <SortingButton
                isActive={sortBy === SortingOptions.RELEVANT}
                onClick={() => {
                    onClick(SortingOptions.RELEVANT);
                }}
            >
                Relevant
            </SortingButton>
            <SortingButton
                isActive={sortBy === SortingOptions.RECENT}
                onClick={() => {
                    onClick(SortingOptions.RECENT);
                }}
            >
                Recent
            </SortingButton>
        </section>
    );
}

type SortingButtonProps = {
    children: ReactNode;
    isActive: boolean;
    onClick: () => void;
};

function SortingButton({ children, isActive, onClick }: SortingButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`sorting__button sorting__button--relevant ${
                isActive && "sorting__button--active"
            }`}
        >
            {children}
        </button>
    );
}
