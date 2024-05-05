import { JobItem } from '../lib/types';

import Spinner from './Spinner';
import JobListItem from './JobListItem';

type JobListProps = {
    jobItems: JobItem[];
    isLoading: boolean;
};

export function JobList({ jobItems, isLoading }: JobListProps) {
    return (
        <ul className="job-list">
            {isLoading ? (
                <Spinner />
            ) : (
                jobItems.map(item => <JobListItem key={item.id} item={item} />)
            )}
        </ul>
    );
}

export default JobList;
