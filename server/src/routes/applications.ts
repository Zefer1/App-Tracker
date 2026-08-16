import express from "express";
import { createApplication } from "../controllers/applicationController.ts";
import { getApplications } from "../controllers/applicationController.ts";
import { getApplication } from "../controllers/applicationController.ts";
import { getApplicationStats } from "../controllers/applicationController.ts";
import { updateApplication } from "../controllers/applicationController.ts";
import { deleteApplication } from "../controllers/applicationController.ts";
import authMiddleware from "../middleware/authMiddleware.ts";

const router =  express.Router();
router.post('/', authMiddleware, createApplication)
router.get('/', authMiddleware, getApplications)
router.get('/stats', authMiddleware, getApplicationStats)
router.get('/:id', authMiddleware, getApplication)
router.put('/:id', authMiddleware, updateApplication);
router.delete('/:id', authMiddleware, deleteApplication)

export default router;