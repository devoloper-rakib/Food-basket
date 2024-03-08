import { useParams } from 'react-router-dom';
import { useGetRestaurant } from '../api/RestaurantApi';
import { AspectRatio } from '../components/ui/aspect-ratio';
import RestaurantInfo from '../components/RestaurantInfo';
import MenuItems from '../components/MenuItem';

const DetailPage = () => {
	const { restaurantId } = useParams();
	const { restaurant, isLoading } = useGetRestaurant(restaurantId);

	if (isLoading || !restaurant) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className='flex flex-col gap-10'>
			<AspectRatio ratio={16 / 5}>
				<img
					className='object-cover w-full h-full rounded-md'
					alt={restaurant.restaurantName}
					src={restaurant.imageUrl}
				/>
			</AspectRatio>

			<div className='grid md:grid-cols-[4fr_2fr] gap-5 md:px-32'>
				<div className='flex flex-col gap-4'>
					<RestaurantInfo restaurant={restaurant} />
					<span className='text-2xl font-bold tracking-tight'>
						{restaurant.menuItems.map((menuItem, index) => (
							<MenuItems menuItem={menuItem} key={index} />
						))}
					</span>
				</div>
			</div>
		</div>
	);
};

export default DetailPage;
