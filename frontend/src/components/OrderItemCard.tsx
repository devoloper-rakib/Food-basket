import { Order } from '../types';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectValue,
	SelectTrigger,
} from './ui/select';
import { Separator } from './ui/separator';
import { ORDER_STATUS } from '../config/order-status-config';

type Props = {
	order: Order;
};

const OrderItemCard = ({ order }: Props) => {
	const getTime = () => {
		const orderDateTime = new Date(order.createdAt);

		const hours = orderDateTime.getHours();
		const minutes = orderDateTime.getMinutes();

		const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

		return `${hours}:${paddedMinutes}`;
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className='grid justify-between gap-4 mb-3 md:grid-cols-4'>
					<div>
						Customer Name:
						<span className='ml-2 font-normal'>
							{order.deliveryDetails.name}
						</span>
					</div>
					<div>
						Delivery Address:
						<span className='ml-2 font-normal'>
							{order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
						</span>
					</div>
					<div>
						Time:
						<span className='ml-2 font-normal'>{getTime()}</span>
					</div>
					<div>
						Total Cost:
						<span className='ml-2 font-normal'>
							${(order.totalAmount / 100).toFixed(2)}
						</span>
					</div>
				</CardTitle>
				<Separator />
			</CardHeader>

			<CardContent className='flex flex-col gap-6'>
				<div className='flex flex-col gap-2'>
					{order.cartItems.map((cartItem, index) => (
						<span key={index}>
							<Badge variant='outline' className='mr-2'>
								{cartItem.quantity.toString()}
							</Badge>
							{cartItem.name}
						</span>
					))}
				</div>
				<div className='flex  flex-col space-y-1.5 '>
					<Label htmlFor='status'>What is the status of this order?</Label>
					<Select>
						<SelectTrigger id='status'>
							<SelectValue placeholder='Status' />
						</SelectTrigger>
						<SelectContent position='popper'>
							{ORDER_STATUS.map((status, index) => (
								<SelectItem key={index} value={status.value}>
									{status.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</CardContent>
		</Card>
	);
};

export default OrderItemCard;
