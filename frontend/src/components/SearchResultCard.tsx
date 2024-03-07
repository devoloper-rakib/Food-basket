import { Link } from 'react-router-dom';
import { Restaurant } from '../types';
import { AspectRatio } from './ui/aspect-ratio';
import { Banknote, Clock, Dot } from 'lucide-react';

type Props = {
	restaurant: Restaurant;
};

// TODO: will give more space and color to card

const SearchResultCard = ({ restaurant }: Props) => {
	return (
		<Link
			to={`/detail/${restaurant._id}`}
			className='grid lg:grid-cols-[2fr_3fr] gap-5 group'
		>
			<AspectRatio ratio={16 / 6}>
				<img
					src={restaurant.imageUrl}
					alt={restaurant.restaurantName}
					className='object-cover w-full h-full rounded-md'
				/>
			</AspectRatio>

			<div>
				<h3 className='mb-2 text-2xl font-bold tracking-tight group-hover:underline'>
					{restaurant.restaurantName}
				</h3>

				<div id='card-content' className='grid gap-2 md:grid-cols-2'>
					<div className='flex flex-row flex-wrap'>
						{restaurant.cuisines.map((item, index) => (
							<span className='flex' key={index}>
								{/* TODO: will update style and other thing  */}
								<span>{item}</span>
								{index < restaurant.cuisines.length - 1 && <Dot />}
							</span>
						))}
					</div>
					<div className='flex flex-col gap-2'>
						<div className='flex items-center gap-1 text-green-600'>
							<Clock className='text-green-600' />
							{restaurant.estimatedDeliveryTime} mins
						</div>

						<div className='flex items-center gap-1'>
							<Banknote />
							Delivery from ${(restaurant.deliveryPrice / 100).toFixed(2)}
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default SearchResultCard;
