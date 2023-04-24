import { Router } from "express";
const router = Router();

import * as BatchController from "../controllers/Batch.controller";

router.post("/batchExist", BatchController.batchExist);
router.post("/createBatch", BatchController.createBatch);
router.post("/callBatches", BatchController.callBatches);
router.post("/callFiles", BatchController.callFiles);
router.get("/downloadBatch", BatchController.downloadBatch);
router.get("/downloadFile", BatchController.downloadFile);
router.post("/changeState", BatchController.changeState);
router.get("/test", BatchController.test);

export default router;
