import express, { Request, Response } from 'express';

import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

import myUserRoute from './routes/MyUserRoutes';

// Point : Connect to mongodb server
mongoose
	.connect(process.env.MONGODB_CONNECTION_STRING as string)
	.then(() => console.log(`Connected to database`));

const app = express();
app.use(express.json());
app.use(cors());

// Point: API ENDPOINT
app.use('/api/my/user', myUserRoute);

// Point: health check
app.get('/health', async (req: Request, res: Response) => {
	res.json({ message: ' Health route is available' });
});

app.listen(7000, () => {
	console.log(`server listening on localhost:${process.env.PORT || 7000}`);
});
