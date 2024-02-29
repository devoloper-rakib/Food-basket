import landingPage from '../assets/landing.png';
import appDownloadImage from '../assets/appDownload.png';

const HomePage = () => {
	return (
		<div className='flex flex-col gap-12'>
			<div className='flex flex-col gap-5 py-8 -mt-16 text-center bg-white rounded-lg shadow-md'>
				<h1 className='text-5xl font-bold tracking-tight text-orange-600'>
					Embrace your inner couch potato and indulge in some sofa cuisine
					tonight! 🛋️🍔🥡
				</h1>
				<span className='text-xl '>Food is just a click away!</span>
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
