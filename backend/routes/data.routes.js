import { Router } from 'express';
import { addData } from "../controllers/data.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/').post(verifyJWT, addData);

export default router;