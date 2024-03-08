import express from 'express';
import { param } from 'express-validator';
import RestaurantController from '../controllers/RestaurantController';

const router = express.Router();

// /api/restaurant/search/dhaka
router.get(
	'/search/:city',
	param('city')
		.isString()
		.trim()
		.notEmpty()
		.withMessage('City parameter must be valid string'),

	RestaurantController.searchRestaurant,
);

// /api/restaurant/:324234dsklfahsd
router.get(
	'/:restaurantId',
	param('restaurantId')
		.isString()
		.trim()
		.notEmpty()
		.withMessage('RestaurantId parameter must be a valid string'),
	RestaurantController.getRestaurant,
);
export default router;
