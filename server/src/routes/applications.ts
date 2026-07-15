import express from "express";
import { createApplication } from "../controllers/applicationController.ts";
import { getApplications } from "../controllers/applicationController.ts";
import { updateApplication } from "../controllers/applicationController.ts";
import { deleteApplication } from "../controllers/applicationController.ts";

const router =  express.Router();
router.post('/', createApplication)
router.get('/', getApplications)
router.put('/:id', updateApplication);
router.delete('/:id', deleteApplication)

export default router;