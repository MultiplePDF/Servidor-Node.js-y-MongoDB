import { Router } from "express";
const router = Router();

import * as loteController from "../controllers/lote.controller";

router.post("/loteExist", loteController.loteExist);
router.post("/create", loteController.createLote);
router.post("/uploadLotes", loteController.uploadLotes);
router.post("/uploadFiles", loteController.uploadfiles);
router.post("/downloadLote", loteController.downloadLote);
router.post("/downloadFile", loteController.downloadFile);
router.post("/changeEstado", loteController.changeEstado);
router.get("/test", loteController.test);

export default router;
