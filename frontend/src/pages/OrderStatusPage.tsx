import { useGetMyOrders } from '../api/OrderApi';
import OrderStatusDetail from '../components/OrderStatusDetail';
import OrderStatusHeader from '../components/OrderStatusHeader';
import { AspectRatio } from '../components/ui/aspect-ratio';

const OrderStatusPage = () => {
	const { orders, isLoading } = useGetMyOrders();

	if (isLoading) {
		return 'loading...';
	}

	if (!orders || orders.length === 0) {
		return 'No orders found';
	}

	return (
		<div className='space-y-10'>
			{orders.map((order, index) => (
				<div key={index} className='p-10 space-y-10 rounded-lg bg-gray-50'>
					<OrderStatusHeader order={order} />
					<div className='grid gap-10 md:grid-cols-2'>
						<OrderStatusDetail order={order} />
						<AspectRatio ratio={16 / 5}>
							<img
								src={order.restaurant.imageUrl}
								alt={order.restaurant.restaurantName}
								className='object-cover w-full h-full rounded-md'
							/>
						</AspectRatio>
					</div>
				</div>
			))}
		</div>
	);
};

export default OrderStatusPage;
