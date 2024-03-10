import express, { Request, Response } from 'express';

import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';

import myUserRoute from './routes/MyUserRoutes';
import myRestaurantRoute from './routes/MyRestaurantRoute';
import restaurantRoute from './routes/RestaurantRoute';
import orderRoute from './routes/OrderRoute';

// Point : Connect to mongodb server
mongoose
	.connect(process.env.MONGODB_CONNECTION_STRING as string)
	.then(() => console.log(`Connected to database`));

// Point: cloudinary setup
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cors());

// Point: Stripe to validate express data
app.use('/api/order/checkout/webhook', express.raw({ type: '*/*' }));

app.use(express.json());

// Point: health check
app.get('/health', async (req: Request, res: Response) => {
	res.json({ message: ' Health route is available' });
});

// Point: API ENDPOINT
app.use('/api/my/user', myUserRoute);
app.use('/api/my/restaurant', myRestaurantRoute);
app.use('/api/restaurant', restaurantRoute);
app.use('/api/order', orderRoute);

app.listen(7000, () => {
	console.log(`server listening on localhost:${process.env.PORT || 7000}`);
});
