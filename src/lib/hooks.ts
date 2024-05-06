import { useEffect, useState } from 'react';

import { JobItem, JobItemExpanded } from './types';

import { BASE_API_URL } from './constants';

type JobItemsHookResult = [JobItem[], boolean];
type JobItemHookResult = [JobItemExpanded | null, boolean];

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

export const useJobItems = (searchQuery: string): JobItemsHookResult => {
    const [jobItems, setJobItems] = useState<JobItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const jobItemsSliced = jobItems.slice(0, 7);

    useEffect(() => {
        if (!searchQuery) return;

        fetchResults(searchQuery);
    }, [searchQuery]);

    const fetchResults = async (query: string): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_API_URL}?search=${query}`);
            if (!response.ok) throw new Error();

            const data = await response.json();
            setJobItems(data.jobItems);
            setIsLoading(false);
        } catch (err) {
            console.log('ouch');
        } finally {
            setIsLoading(false);
        }
    };

    return [jobItemsSliced, isLoading];
};

export const useJobItem = (id: number | null): JobItemHookResult => {
    const [jobItem, setJobItem] = useState<JobItemExpanded | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchJobData = async (): Promise<void> => {
            setIsLoading(true);
            try {
                const response = await fetch(`${BASE_API_URL}/${id}`);
                const data = await response.json();
                setJobItem(data.jobItem);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobData();
    }, [id]);

    return [jobItem, isLoading];
};
