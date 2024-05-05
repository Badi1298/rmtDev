import { useEffect, useState } from 'react';

import { useDebounce } from 'use-debounce';

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
    const [jobItems, setJobItems] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery] = useDebounce(searchQuery, 1000);

    useEffect(() => {
        if (!debouncedSearchQuery) return;

        fetchResults(debouncedSearchQuery);
    }, [debouncedSearchQuery]);

    const fetchResults = async (query: string): Promise<void> => {
        const response = await fetch(
            `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${query}`
        );
        if (!response.ok) throw new Error();

        const data = await response.json();
        setJobItems(data.jobItems);
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
                        <ResultsCount />
                        <SortingControls />
                    </SidebarTop>
                    <JobList jobItems={jobItems} />
                    <Pagination />
                </Sidebar>
                <JobItemContent />
            </Container>
            <Footer />
        </>
    );
}

export default App;
