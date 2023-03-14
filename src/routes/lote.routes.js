import { Router } from "express";
const router = Router();

import * as loteController from "../controllers/lote.controller";

router.post("/create", loteController.createLote);

export default router;
