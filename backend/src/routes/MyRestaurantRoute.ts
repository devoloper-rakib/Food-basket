import express, { Request, Response } from 'express';

import multer from 'multer';

import MyRestaurantController from '../controllers/MyRestaurantController';
import { jwtCheck, jwtParse } from '../middleware/auth';
import { validateMyRestaurantRequest } from '../middleware/validation';

const router = express.Router();

// Point: Multer setup for image upload
const storage = multer.memoryStorage();
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 5 * 1024 * 1024, // 5mb
	},
});

// Point: Restaurant Order description
router.get(
	'/order',
	jwtCheck,
	jwtParse,
	MyRestaurantController.getMyRestaurantOrders,
);

// Point: Restaurant order status Update
router.patch(
	'/order/:orderId/status',
	jwtCheck,
	jwtParse,
	MyRestaurantController.updateOrderStatus,
);

// /api/my/restaurant
router.get('/', jwtCheck, jwtParse, MyRestaurantController.getMyRestaurant);

// /api/my/restaurant
router.post(
	'/',
	upload.single('imageFile'),
	validateMyRestaurantRequest,
	jwtCheck,
	jwtParse,
	MyRestaurantController.createMyRestaurant,
);

router.put(
	'/',
	upload.single('imageFile'),
	validateMyRestaurantRequest,
	jwtCheck,
	jwtParse,
	MyRestaurantController.updateMyRestaurant,
);

export default router;
