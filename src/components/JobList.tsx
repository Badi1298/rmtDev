import { useActiveId } from '../lib/hooks';

import { JobItem } from '../lib/types';

import Spinner from './Spinner';
import JobListItem from './JobListItem';

type JobListProps = {
    isLoading: boolean;
    jobItems: JobItem[];
};

export function JobList({ jobItems, isLoading }: JobListProps) {
    const activeId = useActiveId();

    return (
        <ul className="job-list">
            {isLoading ? (
                <Spinner />
            ) : (
                jobItems?.map(item => (
                    <JobListItem
                        key={item.id}
                        item={item}
                        isActive={item.id === activeId}
                    />
                ))
            )}
        </ul>
    );
}

export default JobList;
