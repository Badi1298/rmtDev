import { useEffect, useState } from 'react';

import { JobItem } from './types';

type JobItemsHookResult = [JobItem[], boolean];

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
            const response = await fetch(
                `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${query}`
            );
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

export const useActiveId = (): [number | null] => {
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

    return [activeId];
};
