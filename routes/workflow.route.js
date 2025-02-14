import { Router } from "express";
import { sendRemainder } from "../controllers/workflow.controller.js";

const workflowRouter = Router();

workflowRouter.post("/subscription/reminder", sendRemainder);

export default workflowRouter;
