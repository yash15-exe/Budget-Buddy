import express from "express";
import { authMiddleware } from "../Middleware/authMiddleware.js";

import { addDataController } from "../Controllers/DataController/addDataController.js";
import { getDataController } from "../Controllers/DataController/getDataController.js";
import { deleteDataController } from "../Controllers/DataController/deleteDataController.js";

const router = express.Router();

router.post("/addFinanceData", authMiddleware, addDataController);
router.post("/getFinanceData",authMiddleware, getDataController)
router.post("/deleteFinanceData", authMiddleware, deleteDataController)

export default router;
