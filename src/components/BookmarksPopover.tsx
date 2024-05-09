import JobList from './JobList';

export default function BookmarksPopover() {
    return (
        <div className="bookmarks-popover">
            <JobList jobItems={[]} isLoading={false} />
        </div>
    );
}
