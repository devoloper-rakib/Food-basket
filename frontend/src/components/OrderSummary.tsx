import { Trash } from 'lucide-react';
import { CartItem } from '../pages/DetailPage';
import { Restaurant } from '../types';
import { Badge } from './ui/badge';
import { CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

type Props = {
	restaurant: Restaurant;
	cartItems: CartItem[];
	removeFromCart: (cartItem: CartItem) => void;
};

const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
	const getTotalCost = () => {
		const totalInCart = cartItems.reduce(
			(total, cartItem) => total + cartItem.price * cartItem.quantity,
			0,
		);

		const totalWithDelivery = totalInCart + restaurant.deliveryPrice;

		return (totalWithDelivery / 100).toFixed(2);
	};

	return (
		<>
			<CardHeader>
				<CardTitle className='flex justify-between text-2xl font-bold tracking-tight'>
					<span>Your order</span>
					<span>${getTotalCost()} </span>
				</CardTitle>
			</CardHeader>

			<CardContent className='flex flex-col gap-5'>
				{cartItems.map((item, index) => (
					<div key={index} className='flex justify-between'>
						<span>
							<Badge variant='outline' className='mr-2'>
								{item.quantity}
							</Badge>
							{item.name}
						</span>
						<span className='flex items-center gap-1'>
							<Trash
								className='cursor-pointer'
								color='red'
								size={20}
								onClick={() => removeFromCart(item)}
							/>
							$ {((item.price * item.quantity) / 100).toFixed(2)}
						</span>
					</div>
				))}
				<Separator />

				<div className='flex justify-between'>
					<span>Delivery</span>
					<span>$ {(restaurant.deliveryPrice / 100).toFixed(2)} </span>
				</div>
				<Separator />
			</CardContent>
		</>
	);
};

export default OrderSummary;
