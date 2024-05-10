import { useState } from 'react';

import { useDebounce } from 'use-debounce';
import { useSearchJobItems } from '../lib/hooks';

import { SortingOptions } from '../lib/enums';
import { RESULTS_PER_PAGE } from '../lib/constants';
import { TPageChangeDirection, TSortBy } from '../lib/types';

import { Toaster } from 'react-hot-toast';

import Logo from './Logo';
import Footer from './Footer';
import JobList from './JobList';
import Container from './Container';
import Background from './Background';
import SearchForm from './SearchForm';
import ResultsCount from './ResultsCount';
import Header, { HeaderTop } from './Header';
import Pagination from './PaginationControls';
import JobItemContent from './JobItemContent';
import Sidebar, { SidebarTop } from './Sidebar';
import SortingControls from './SortingControls';
import BookmarksButton from './BookmarksButton';

function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery] = useDebounce(searchQuery, 1000);

    const { jobItems, isLoading } = useSearchJobItems(debouncedSearchQuery);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState<TSortBy>(SortingOptions.RELEVANT);

    const resultsCount = jobItems?.length || 0;
    const numberOfPages = resultsCount / RESULTS_PER_PAGE;

    const jobItemsSorted = [...(jobItems || [])].sort((a, b) => {
        if (sortBy === SortingOptions.RELEVANT) {
            return b.relevanceScore - a.relevanceScore;
        } else if (sortBy === SortingOptions.RECENT) {
            return a.daysAgo - b.daysAgo;
        }

        return 0;
    });

    const jobItemsSliced =
        jobItemsSorted?.slice(
            (currentPage - 1) * RESULTS_PER_PAGE,
            currentPage * RESULTS_PER_PAGE
        ) || [];

    const handlePageChange = (direction: TPageChangeDirection): void => {
        if (direction === 'next') {
            setCurrentPage(prev => prev + 1);
        } else if (direction === 'previous') {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleSortBy = (newSortBy: TSortBy) => {
        setCurrentPage(1);
        setSortBy(newSortBy);
    };

    return (
        <>
            <Background />

            <Header>
                <HeaderTop>
                    <Logo />
                    <BookmarksButton />
                </HeaderTop>
                <SearchForm
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
            </Header>

            <Container>
                <Sidebar>
                    <SidebarTop>
                        <ResultsCount resultsCount={resultsCount} />
                        <SortingControls
                            sortBy={sortBy}
                            onClick={handleSortBy}
                        />
                    </SidebarTop>
                    <JobList jobItems={jobItemsSliced} isLoading={isLoading} />
                    <Pagination
                        currentPage={currentPage}
                        numberOfPages={numberOfPages}
                        onClick={handlePageChange}
                    />
                </Sidebar>
                <JobItemContent />
            </Container>

            <Footer />

            <Toaster position={'top-right'} />
        </>
    );
}

export default App;
