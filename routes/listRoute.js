import express from "express";
import {
    createList,
    getAllLists,
    updateItemsInList,
    getListWithItems,
    deleteList,
} from "../controllers/listController.js";


const router = express.Router();

router.post("/", createList); // Create a new list
router.get("/", getAllLists); // Get all lists
router.get("/:listId", getListWithItems); // Get a list with items
router.delete("/:listId", deleteList); // Delete a list
router.put("/:listId/items", updateItemsInList); // update and add items to a list

export default router;