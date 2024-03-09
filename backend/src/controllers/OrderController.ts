import { Request, Response } from 'express';
import Stripe from 'stripe';
import Restaurant, { MenuItemType } from '../models/restaurant';

// Initializing Stripe instance and frontend URL
const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
const FRONTEND_URL = process.env.FRONTEND_URL as string;

// Defining the structure of the request body expected for creating a checkout session
type CheckoutSessionRequest = {
	cartItems: {
		menuItemId: string;
		name: string;
		quantity: string;
	}[];
	deliveryDetails: {
		email: string;
		name: string;
		addressLine1: string;
		city: string;
	};
	restaurantId: string;
};

// Function to create a checkout session
const createCheckoutSession = async (req: Request, res: Response) => {
	try {
		// Extracting relevant data from the request body
		const checkoutSessionRequest: CheckoutSessionRequest = req.body;

		// Finding the restaurant based on the provided ID
		const restaurant = await Restaurant.findById(
			checkoutSessionRequest.restaurantId,
		);
		if (!restaurant) {
			throw new Error('Restaurant not found :(');
		}

		// Creating line items for the checkout session based on cart items and menu items
		const lineItems = createLineItems(
			checkoutSessionRequest,
			restaurant.menuItems,
		);

		// Creating the checkout session using Stripe API
		const session = await createSession(
			lineItems,
			'TEST_ORDER_ID',
			restaurant.deliveryPrice,
			restaurant._id.toString(),
		);
		if (!session.url) {
			return res.status(500).json({ message: 'Error creating stripe session' });
		}

		// Sending the URL of the created session to the client
		res.json({ url: session.url });
	} catch (error: any) {
		// Handling errors
		console.log('error creating checkout session:', error);
		res.status(500).json({ message: error.raw.message });
	}
};

// Function to create line items for the checkout session
const createLineItems = (
	checkoutSessionRequest: CheckoutSessionRequest,
	menuItems: MenuItemType[],
) => {
	const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
		const menuItem = menuItems.find(
			(item) => item._id.toString() === cartItem.menuItemId.toString(),
		);
		if (!menuItem) {
			throw new Error(`Menu item not found : ${cartItem.menuItemId}`);
		}

		// Constructing line item object for Stripe API
		const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
			price_data: {
				currency: 'USD',
				unit_amount: menuItem.price,
				product_data: {
					name: menuItem.name,
				},
			},
			quantity: parseInt(cartItem.quantity),
		};

		return line_item;
	});

	return lineItems;
};

// Function to create the actual checkout session using Stripe API
const createSession = async (
	lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
	orderId: string,
	deliveryPrice: number,
	restaurantId: string,
) => {
	const sessionData = await STRIPE.checkout.sessions.create({
		line_items: lineItems,
		shipping_options: [
			{
				shipping_rate_data: {
					display_name: 'delivery',
					type: 'fixed_amount',
					fixed_amount: {
						amount: deliveryPrice,
						currency: 'USD',
					},
				},
			},
		],
		mode: 'payment',
		metadata: {
			orderId,
			restaurantId,
		},
		success_url: `${FRONTEND_URL}/order-status?success=true`,
		cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?canalled=true`,
	});

	return sessionData;
};

export default {
	createCheckoutSession,
};
