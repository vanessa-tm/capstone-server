import express from "express";
import {
    createList,
    getAllLists,
    addItemsToList,
    getListWithItems,
    updateListName,
    deleteList,
} from "../controllers/listController.js";


const router = express.Router();

router.post("/", createList); // Create a new list
router.get("/", getAllLists); // Get all lists
router.get("/:listId", getListWithItems); // Get a list with items
router.post("/:listId/items", addItemsToList); // Add items to a list
router.put("/:listId", updateListName); // Update a list name
router.delete("/:listId", deleteList); // Delete a list


export default router;