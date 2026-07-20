import { Router } from "express";
import { createUser } from "../controllers/userController.ts";
import { getUsers } from "../controllers/userController.ts";
import { updateUser } from "../controllers/userController.ts";
import { deleteUser } from "../controllers/userController.ts";
import authMiddleware from "../middleware/authMiddleware.ts";

const router = Router();
router.post('/', createUser);
router.get('/', authMiddleware, getUsers)
router.put('/:id', authMiddleware, updateUser)
router.delete('/:id', authMiddleware, deleteUser)

export default router;