import { useQueries, useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';

import { handleError } from './utils';
import { BASE_API_URL } from './constants';

import { JobItem, JobItemExpanded } from './types';

import { ActiveIdContext } from '../contexts/ActiveIdContextProvider';
import { BookmarksContext } from '../contexts/BookmarksContextProvider';

type JobItemsApiResponse = {
    sorted: boolean;
    public: boolean;
    jobItems: JobItem[];
};

type JobItemApiResponse = {
    public: boolean;
    jobItem: JobItemExpanded;
};

type JobItemHookResult = {
    isLoading: boolean;
    jobItem: JobItemExpanded | null | undefined;
};

type SearchJobItemsHookResult = {
    isLoading: boolean;
    jobItems: JobItem[] | undefined;
};

type JobItemsHookResult = {
    isLoading: boolean;
    jobItems: JobItemExpanded[];
};

const fetchJobItems = async (query: string): Promise<JobItemsApiResponse> => {
    try {
        const response = await fetch(`${BASE_API_URL}?search=${query}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.description);
        }

        const data = await response.json();
        return data;
    } catch (err) {
        handleError(err);
        throw err;
    }
};

export const useSearchJobItems = (
    searchQuery: string
): SearchJobItemsHookResult => {
    const { data, isInitialLoading } = useQuery(
        ['job-items', searchQuery],
        () => fetchJobItems(searchQuery),
        {
            enabled: !!searchQuery,
            retry: false,
            staleTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
        }
    );

    return {
        jobItems: data?.jobItems,
        isLoading: isInitialLoading,
    };
};

const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
    try {
        const response = await fetch(`${BASE_API_URL}/${id}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.description);
        }

        const data = await response.json();
        return data;
    } catch (err) {
        handleError(err);
        throw err;
    }
};

export const useJobItem = (id: number | null): JobItemHookResult => {
    const { data, isInitialLoading } = useQuery(
        ['job-item', id],
        () => (id ? fetchJobItem(id) : null),
        {
            enabled: !!id,
            retry: false,
            staleTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
        }
    );

    return { jobItem: data?.jobItem, isLoading: isInitialLoading };
};

export const useJobItems = (ids: number[]): JobItemsHookResult => {
    const results = useQueries({
        queries: ids.map(id => ({
            queryKey: ['job-item', id],
            queryFn: () => fetchJobItem(id),
            enabled: !!id,
            retry: false,
            staleTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
        })),
    });

    const jobItems = results
        .map(result => result.data?.jobItem)
        .filter((jobItem): jobItem is JobItemExpanded => !!jobItem);

    const isLoading = results.some(result => result.isLoading);

    return { jobItems, isLoading };
};

export const useActiveId = (): number | null => {
    const [activeId, setActiveId] = useState<number | null>(null);

    useEffect(() => {
        const handleHashChange = () => {
            const id = +window.location.hash.slice(1);
            setActiveId(id);
        };
        handleHashChange();

        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    return activeId;
};

export function useBookmarksContext() {
    const context = useContext(BookmarksContext);

    if (!context)
        throw new Error(
            'useBookmarksContext must be used within a BookmarksContextProvider'
        );

    return context;
}

export function useActiveIdContext() {
    const context = useContext(ActiveIdContext);

    if (!context)
        throw new Error(
            'useActiveIdContext must be used within a ActiveIdContextProvider'
        );

    return context;
}
