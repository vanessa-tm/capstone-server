
import express from "express";
import { getAllItems } from "../controllers/itemsController.js";

const router = express.Router()

//Route to get all items

router.get("/", getAllItems);

export default router;