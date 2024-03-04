import express, { Request, Response } from 'express';

import multer from 'multer';

const router = express.Router();

// Point: Multer setup for image upload
const storage = multer.memoryStorage();
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 5 * 1024 * 1024, // 5mb
	},
});

// /api/my/restaurant
router.post(
	'/',
	upload.single('imageFile'),
	MyRestaurantController.createMyRestaurant,
);
