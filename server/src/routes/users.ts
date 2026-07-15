import { Router } from "express";
import { createUser } from "../controllers/userController.ts";
import { getUsers } from "../controllers/userController.ts";
import { updateUser } from "../controllers/userController.ts";
import { deleteUser } from "../controllers/userController.ts";

const router = Router();
router.post('/', createUser);
router.get('/', getUsers) 
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router;