import { Request, Response } from 'express';
import User from '../models/user';

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

export default {
	createCurrentUser,
};
