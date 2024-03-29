import { useParams } from 'react-router-dom';
import { useGetRestaurant } from '../api/RestaurantApi';
import { AspectRatio } from '../components/ui/aspect-ratio';
import RestaurantInfo from '../components/RestaurantInfo';
import MenuItems from '../components/MenuItem';
import { useState } from 'react';
import { Card, CardFooter } from '../components/ui/card';
import OrderSummary from '../components/OrderSummary';
import { MenuItem } from '../types';
import CheckoutButton from '../components/CheckoutButton';
import { UserFormData } from '../forms/user-profile-form/UserProfileForm';
import { useCreateCheckoutSession } from '../api/OrderApi';
import LoaderAnimation from '../components/LoaderAnimation';

// Point :
export type CartItem = {
	_id: string;
	name: string;
	price: number;
	quantity: number;
};

// TODO: will update add to cart functionality to   increment or decrement the quantity with a button and in menu item will try to added images to it and make the ui more visible and more attractive to the user

const DetailPage = () => {
	const { restaurantId } = useParams();
	const { restaurant, isLoading } = useGetRestaurant(restaurantId);
	const { createCheckoutSession, isLoading: isCheckoutLoading } =
		useCreateCheckoutSession();

	const [cartItems, setCartItems] = useState<CartItem[]>(() => {
		const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);

		return storedCartItems ? JSON.parse(storedCartItems) : [];
	});

	const addToCart = (menuItem: MenuItem) => {
		setCartItems((prevCartItems) => {
			// Point: 1) check if the item is already in the cart
			const existingCartItem = prevCartItems.find(
				(cartItem) => cartItem._id === menuItem._id,
			);

			// Point: 2) if item is in the cart, update the quantity
			let updatedCartItems;
			if (existingCartItem) {
				updatedCartItems = prevCartItems.map((cartItem) =>
					cartItem._id === menuItem._id
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem,
				);
			} else {
				updatedCartItems = [
					...prevCartItems,
					{
						_id: menuItem._id,
						name: menuItem.name,
						price: menuItem.price,
						quantity: 1,
					},
				];
			}
			// Point: 3) if item is not in the cart , added to the cart as a new item
			sessionStorage.setItem(
				`cartItems-${restaurantId}`,
				JSON.stringify(updatedCartItems),
			);

			return updatedCartItems;
		});
	};

	const removeFromCart = (cartItem: CartItem) => {
		setCartItems((prevCartItems) => {
			const updatedCartItems = prevCartItems.filter(
				(item) => cartItem._id !== item._id,
			);

			sessionStorage.setItem(
				`cartItems-${restaurantId}`,
				JSON.stringify(updatedCartItems),
			);

			return updatedCartItems;
		});
	};

	const onCheckout = async (userFormData: UserFormData) => {
		console.log('userFormData', userFormData);

		if (!restaurant) return;

		const checkoutData = {
			cartItems: cartItems.map((cartItem) => ({
				menuItemId: cartItem._id,
				name: cartItem.name,
				quantity: cartItem.quantity.toString(),
			})),
			restaurantId: restaurant?._id,
			deliveryDetails: {
				name: userFormData.name,
				addressLine1: userFormData.addressLine1,
				country: userFormData.country,
				city: userFormData.city,
				email: userFormData.email as string,
			},
		};

		const data = await createCheckoutSession(checkoutData);
		window.location.href = data.url;
	};

	if (isLoading || !restaurant) {
		return <LoaderAnimation />;
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
					<h3 className='text-2xl font-bold tracking-tight'>Menu</h3>

					{restaurant.menuItems.map((menuItem, index) => (
						<MenuItems
							addToCart={() => addToCart(menuItem)}
							menuItem={menuItem}
							key={index}
						/>
					))}
				</div>
				<div>
					<Card>
						<OrderSummary
							restaurant={restaurant}
							cartItems={cartItems}
							removeFromCart={removeFromCart}
						/>

						<CardFooter>
							<CheckoutButton
								disabled={cartItems.length === 0}
								onCheckout={onCheckout}
								isLoading={isCheckoutLoading}
							/>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default DetailPage;
