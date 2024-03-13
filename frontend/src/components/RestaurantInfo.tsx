// import { Dot } from 'lucide-react';
import { Restaurant } from '../types';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './ui/card';

type Props = {
	restaurant: Restaurant;
};

const RestaurantInfo = ({ restaurant }: Props) => {
	return (
		<Card className='border-sla'>
			<CardHeader>
				<CardTitle className='text-3xl font-bold tracking-tight'>
					{restaurant.restaurantName}
				</CardTitle>
				<CardDescription>
					{restaurant.city}, {restaurant.country}
				</CardDescription>
			</CardHeader>

			{/* <CardContent className='flex flex-wrap'>
				{restaurant.cuisines.map((item, index) => (
					<span className='flex' key={index}>
						<span>{item}</span>
						{index < restaurant.cuisines.length - 1 && <Dot />}
					</span>
				))}
			</CardContent> */}

			<CardContent className='flex flex-wrap gap-2 p-4 bg-gray-100 border border-gray-300 rounded'>
				{restaurant.cuisines.map((item, index) => (
					<span className='flex items-center' key={index}>
						<span className='mr-2'>{item}</span>
						{index < restaurant.cuisines.length - 1 && (
							<span className='w-2 h-2 bg-gray-400 rounded-full'></span>
						)}
					</span>
				))}
			</CardContent>
		</Card>
	);
};

export default RestaurantInfo;
