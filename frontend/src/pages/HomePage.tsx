import landingPage from '../assets/landing.png';
import appDownloadImage from '../assets/appDownload.png';
import SearchBar, { SearchForm } from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
	const navigate = useNavigate();

	const handleSearchSubmit = (searchFormValues: SearchForm) => {
		navigate({
			pathname: `/search/${searchFormValues.searchQuery}`,
		});
	};

	return (
		<div className='flex flex-col gap-12 '>
			<div className='flex flex-col gap-5 py-8 -mt-16 text-center bg-white rounded-lg shadow-md md:px-32'>
				<h1 className='px-2 text-2xl font-bold tracking-tight text-orange-600 md:text-4xl md:px-0'>
					Embrace your inner couch potato and indulge in some sofa cuisine
					tonight! 🛋️🍔🥡
				</h1>
				<span className='text-xl '>Food is just a click away!</span>

				<SearchBar
					placeHolder='Search by city or town'
					onSubmit={handleSearchSubmit}
				/>
			</div>
			<div className='grid gap-5 md:grid-cols-2'>
				<img src={landingPage} alt='Landing page' />

				<div className='flex flex-col items-center justify-center gap-4 text-center'>
					<h3 className='text-3xl font-bold tracking-tight'>
						Order takeaway even faster
					</h3>
					<span>
						Download the Food-Basket App for faster ordering and personalized
						recommendations
					</span>

					<img src={appDownloadImage} alt='App download images' />
				</div>
			</div>
		</div>
	);
};

export default HomePage;
