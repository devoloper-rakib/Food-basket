import express from 'express';
import MyUserController from '../controllers/MyUserController';
import { jwtCheck, jwtParse } from '../middleware/auth';
import { validateMyUserRequest } from '../middleware/validation';

const router = express.Router();

// /api/my/user => create a user
router.post('/', jwtCheck, MyUserController.createCurrentUser);

// /api/my/user => update the currentUser
router.put(
	'/',
	jwtCheck,
	jwtParse,
	validateMyUserRequest,
	MyUserController.updateCurrentUser,
);

export default router;
