import JobListItem from './JobListItem';

export function JobList({ jobItems }) {
    return (
        <ul className="job-list">
            {jobItems.map(item => (
                <JobListItem key={item.id} item={item} />
            ))}
        </ul>
    );
}

export default JobList;
