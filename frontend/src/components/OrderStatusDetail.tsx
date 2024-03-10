import { Order } from '../types';
import { Separator } from './ui/separator';

type Props = {
	order: Order;
};

const OrderStatusDetail = ({ order }: Props) => {
	return (
		<div className='space-y-5'>
			<div className='flex flex-col'>
				<span className='font-bold'>Delivering to:</span>
				<span> {order.deliveryDetails.name} </span>
				<span>
					{order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
				</span>
			</div>

			<div className='flex flex-col'>
				<span className='font-bold'>
					<ul>
						{order.cartItems.map((item, index) => (
							<li key={index}>
								{item.name} * {item.quantity}
							</li>
						))}
					</ul>
				</span>
			</div>
			<Separator />
			<div className='flex flex-col'>
				<span className='font-bold'>Total</span>
				<span>$ {(order.totalAmount / 100).toFixed(2)} </span>
			</div>
		</div>
	);
};

export default OrderStatusDetail;
