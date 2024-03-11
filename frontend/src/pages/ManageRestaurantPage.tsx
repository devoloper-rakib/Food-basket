import {
	useCreateMyRestaurant,
	useGetMyRestaurant,
	useGetMyRestaurantOrders,
	useUpdateMyRestaurant,
} from '../api/MyRestaurantApi';
import OrderItemCard from '../components/OrderItemCard';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '../components/ui/tabs';
import ManageRestaurantForm from '../forms/manage-restaurant-form/ManageRestaurantForm';

const ManageRestaurantPage = () => {
	const { restaurant } = useGetMyRestaurant();
	const { createRestaurant, isLoading: isCreateLoading } =
		useCreateMyRestaurant();
	const { updateRestaurant, isLoading: isUpdateLoading } =
		useUpdateMyRestaurant();

	const { orders } = useGetMyRestaurantOrders();

	const isEditing = !!restaurant;

	return (
		<Tabs defaultValue='orders'>
			<TabsList>
				<TabsTrigger value='orders'>Orders</TabsTrigger>
				<TabsTrigger value='manage-restaurant'>Manage Restaurant</TabsTrigger>
			</TabsList>
			<TabsContent
				value='orders'
				className='p-10 space-y-5 rounded-lg bg-gray-50'
			>
				<h2 className='text-2xl font-bold'> {orders?.length} active orders </h2>
				{orders?.map((order, index) => (
					<OrderItemCard order={order} key={index} />
				))}
			</TabsContent>
			<TabsContent value='manage-restaurant'>
				<ManageRestaurantForm
					restaurant={restaurant}
					onSave={isEditing ? updateRestaurant : createRestaurant}
					isLoading={isCreateLoading || isUpdateLoading}
				/>
			</TabsContent>
		</Tabs>
	);
};

export default ManageRestaurantPage;
