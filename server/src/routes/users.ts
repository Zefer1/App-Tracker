import { Router } from "express";
import { createUser } from "../controllers/userController.ts";
import { getMe } from "../controllers/userController.ts";
import { updateUser } from "../controllers/userController.ts";
import { deleteUser } from "../controllers/userController.ts";
import authMiddleware from "../middleware/authMiddleware.ts";

const router = Router();
router.post('/', createUser);
router.get('/me', authMiddleware, getMe)
router.put('/me', authMiddleware, updateUser)
router.delete('/me', authMiddleware, deleteUser)

export default router;