import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';

import { handleError } from './utils';
import { BASE_API_URL } from './constants';

import { JobItem, JobItemExpanded } from './types';

import { BookmarksContext } from '../contexts/BookmarksContextProvider';

type JobItemsApiResponse = {
    sorted: boolean;
    public: boolean;
    jobItems: JobItem[];
};

type JobItemsHookResult = {
    isLoading: boolean;
    jobItems: JobItem[] | undefined;
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

export const useJobItems = (searchQuery: string): JobItemsHookResult => {
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

type JobItemApiResponse = {
    public: boolean;
    jobItem: JobItemExpanded;
};

type JobItemHookResult = {
    isLoading: boolean;
    jobItem: JobItemExpanded | null | undefined;
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
