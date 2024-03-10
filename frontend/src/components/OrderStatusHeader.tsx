import { ORDER_STATUS } from '../config/order-status-config';
import { Order } from '../types';
import { Progress } from './ui/progress';

type Props = {
	order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
	// const getExpectedDelivery = () => {
	// 	const created = new Date(order.createdAt);

	// 	created.getMinutes(
	// 		created.getMinutes() + order.restaurant.estimatedDeliveryTime,
	// 	);

	// 	const hours = created.getHours();
	// 	const minutes = created.getMinutes();

	// 	const paddedMinutes = minutes < 10 ? `0${minutes} ` : minutes;

	// 	return `${hours} : ${paddedMinutes}`;
	// };

	const getExpectedDelivery = () => {
		const created = new Date(order.createdAt);
		const estimatedDeliveryMinutes = order.restaurant.estimatedDeliveryTime;

		created.setMinutes(created.getMinutes() + estimatedDeliveryMinutes);

		const hours = created.getHours();
		const minutes = created.getMinutes();

		const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

		return `${hours}:${paddedMinutes}`;
	};

	const getOrderStatusInfo = () =>
		ORDER_STATUS.find((odr) => odr.value === order.status) || ORDER_STATUS[0];

	return (
		<>
			<h1 className='flex flex-col gap-5 text-4xl font-bold tracking-tighter md:flex-row md:justify-between '>
				<span className=''>Order Status: {getOrderStatusInfo().label}</span>

				<span> Expected by: {getExpectedDelivery()} </span>
			</h1>

			<Progress
				className='animate-pulse'
				value={getOrderStatusInfo().progressValue}
			/>
		</>
	);
};

export default OrderStatusHeader;
