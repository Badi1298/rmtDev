import { useState } from 'react';

import { useDebounce } from 'use-debounce';
import { useJobItems } from '../lib/hooks';

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

    const { jobItems, isLoading } = useJobItems(debouncedSearchQuery);
    const [currentPage, setCurrentPage] = useState(1);

    const resultsCount = jobItems?.length || 0;
    const numberOfPages = resultsCount / 7 || 1;
    const jobItemsSliced =
        jobItems?.slice((currentPage - 1) * 7, currentPage * 7) || [];

    const handlePageChange = (direction: 'next' | 'previous'): void => {
        if (direction === 'next') {
            setCurrentPage(prev => prev + 1);
        } else if (direction === 'previous') {
            setCurrentPage(prev => prev - 1);
        }
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
                        <SortingControls />
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
