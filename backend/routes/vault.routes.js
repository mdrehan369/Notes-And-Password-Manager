import { Router } from 'express';
import {
    getVaultData,
    createVault,
    deleteVault,
} from "../controllers/vault.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/').post(verifyJWT, getVaultData);
router.route('/:name').delete(verifyJWT, deleteVault);
router.route('/create').post(verifyJWT, createVault);

export default router;