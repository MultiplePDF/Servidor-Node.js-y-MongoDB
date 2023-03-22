import { Router } from "express";
const router = Router();

import * as loteController from "../controllers/lote.controller";

router.post("/create", loteController.createLote);
router.post("/uploadLotes", loteController.uploadLotes);
router.post("/uploadFiles", loteController.uploadfiles);

export default router;
