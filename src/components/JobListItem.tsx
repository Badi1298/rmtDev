import { JobItem } from '../lib/types';

import BookmarkIcon from './BookmarkIcon';

type JobListItemProps = {
    item: JobItem;
    isActive: boolean;
};

export default function JobListItem({ item, isActive }: JobListItemProps) {
    return (
        <li className={`job-item ${isActive && 'job-item--active'}`}>
            <a className="job-item__link" href={`#${item.id}`}>
                <div className="job-item__badge">{item.badgeLetters}</div>

                <div className="job-item__middle">
                    <h3 className="third-heading">{item.title}</h3>
                    <p className="job-item__company">{item.company}</p>
                </div>

                <div className="job-item__right">
                    <BookmarkIcon id={item.id} />
                    <time className="job-item__time">{item.daysAgo}d</time>
                </div>
            </a>
        </li>
    );
}
