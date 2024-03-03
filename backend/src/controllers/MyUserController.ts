import { Request, Response } from 'express';
import User from '../models/user';

// Point: Get current user information
const getCurrentUser = async (req: Request, res: Response) => {
	try {
		const currentUser = await User.findOne({
			_id: req.userId,
		});
		if (!currentUser)
			return res.status(404).json({ message: 'User not  found' });

		res.json(currentUser);
	} catch (error) {
		console.log('error getting user information :', error);
		return res.status(500).json({ messsage: 'Something went wrong' });
	}
};

// Point : create a single user
const createCurrentUser = async (req: Request, res: Response) => {
	try {
		// Point: 1) check if the user already exists
		const { auth0Id } = req.body;
		const existingUser = await User.findOne({ auth0Id });
		if (existingUser) return res.status(200).send();

		// Point: 2) create a new user if it doesn't exist
		const newUser = new User(req.body);
		await newUser.save();

		// Point: 3) return the user object to the calling client/frontend
		res.status(201).json(newUser.toObject());
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error creating user:(' });
	}
};

// Point: Update current User
const updateCurrentUser = async (req: Request, res: Response) => {
	try {
		const { name, addressLine1, country, city } = req.body;
		const user = await User.findById(req?.userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found!)' });
		}
		user.name = name;
		user.addressLine1 = addressLine1;
		user.city = city;
		user.country = country;

		await user.save();

		res.send(user);
	} catch (error) {
		console.log('error Updating user: ' + error);
		res.status(500).json({ message: 'Error updating user' });
	}
};

export default {
	createCurrentUser,
	updateCurrentUser,
	getCurrentUser,
};
