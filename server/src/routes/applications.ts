import express from "express";
import { createApplication } from "../controllers/applicationController.ts";
import { getApplications } from "../controllers/applicationController.ts";
import { updateApplication } from "../controllers/applicationController.ts";
import { deleteApplication } from "../controllers/applicationController.ts";
import authMiddleware from "../middleware/authMiddleware.ts";

const router =  express.Router();
router.post('/', authMiddleware, createApplication)
router.get('/', authMiddleware, getApplications)
router.put('/:id', authMiddleware, updateApplication);
router.delete('/:id', authMiddleware, deleteApplication)

export default router;