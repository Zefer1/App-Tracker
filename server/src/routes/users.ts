import { Router } from "express";
import { createUser } from "../controllers/userController.ts";

const router = Router();
router.post('/', createUser);

export default router;