import { Router } from 'express';
import {
    deleteUser, getAllVaults,
    getCurrentUser,
    login, logout,
    signup,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/login').post(login);
router.route('/signup').post(signup);
router.route('/logout').get(logout);

// Protected Routes

router.route('/').get(verifyJWT, getCurrentUser);
router.route('/').delete(verifyJWT, deleteUser);
router.route('/vaults').get(verifyJWT, getAllVaults);

export default router;
