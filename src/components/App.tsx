import { useState } from 'react';

import { useDebounce } from 'use-debounce';
import { useJobItems } from '../lib/hooks';

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

    const resultsCount = jobItems?.length || 0;
    const jobItemsSliced = jobItems?.slice(0, 7) || [];

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
                    <Pagination />
                </Sidebar>
                <JobItemContent />
            </Container>

            <Footer />
        </>
    );
}

export default App;
