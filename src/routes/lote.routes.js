import { Router } from "express";
const router = Router();

import * as loteController from "../controllers/lote.controller";

router.post("/getLotes", loteController.getLotes);
router.post("/create", loteController.createLote);
router.post("/uploadLotes", loteController.uploadLotes);
router.post("/uploadFiles", loteController.uploadfiles);
router.post("/downloadLote", loteController.downloadLote);
router.post("/downloadFile", loteController.downloadFile);

export default router;
