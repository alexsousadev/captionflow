import { Router } from "express";
import aiController from "../controllers/ai.controller.js";

const aiRouter = Router();

aiRouter.post('/', aiController.getTranscript);

export default aiRouter;