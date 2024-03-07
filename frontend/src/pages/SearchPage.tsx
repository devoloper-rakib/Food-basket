import { useParams } from 'react-router-dom';
import { useSearchRestaurants } from '../api/RestaurantApi';
import SearchResultInfo from '../components/SearchResultInfo';
import SearchResultCard from '../components/SearchResultCard';
import { useState } from 'react';
import SearchBar, { SearchForm } from '../components/SearchBar';
import PaginationSelector from '../components/PaginationSelector';

export type SearchState = {
	searchQuery: string;
	page: number;
};

// ERROR: in search options  first we need to reset all the search query fields when we search something

const SearchPage = () => {
	const { city } = useParams();
	const [searchState, setSearchState] = useState<SearchState>({
		searchQuery: '',
		page: 1,
	});
	const { results, isLoading } = useSearchRestaurants(searchState, city);

	const setPage = (page: number) => {
		setSearchState((prevState) => ({
			...prevState,
			page,
		}));
	};

	const setSearchQuery = (searchFormData: SearchForm) => {
		setSearchState((prevState) => ({
			...prevState,
			searchQuery: searchFormData.searchQuery,
			page: 1,
		}));
	};

	const resetSearch = () => {
		setSearchState((prevState) => ({
			...prevState,
			searchQuery: '',
			page: 1,
		}));
	};

	if (isLoading) return <h1>Loading...</h1>;

	if (!results?.data || !city) return <span>No results found</span>;

	return (
		<div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
			<div id='cuisines-list'>insert cuisines into</div>

			<div id='main-content' className='flex flex-col gap-5'>
				<SearchBar
					searchQuery={searchState.searchQuery}
					onSubmit={setSearchQuery}
					placeHolder='Search By Cuisine or Restaurant Name'
					onReset={resetSearch}
				/>
				<SearchResultInfo total={results?.pagination?.total} city={city} />
				{results?.data.map((restaurant, index) => (
					<SearchResultCard key={index} restaurant={restaurant} />
				))}

				<PaginationSelector
					page={results.pagination.page}
					pages={results.pagination.pages}
					onPageChange={setPage}
				/>
			</div>
		</div>
	);
};

export default SearchPage;
