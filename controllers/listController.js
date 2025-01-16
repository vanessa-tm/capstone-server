import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export const createList = async (req, res) => {
    const { list_name, items } = req.body;

    try {
        //new list
        const [listId] = await knex ("list").insert({list_name});

        // if items are provided, insert them into list_items
        if (items && items.length > 0) {
            const listItems = items.map((item) => ({
                list_id: listId,
                item_name: item.item_name,
                aisle_number: item.aisle_number,
            }));
            await knex ("list_items").insert(listItems);
        }

        res.status(201).json({message: "List created successfully", listId });
    } catch (error) {
        res.status(500).json({message: "Failed to create list", error });
    }
};

// Get all lists from the list table
export const getAllLists = async (req, res) => {
  try {
    const lists = await knex("list").select("*");

    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all lists", error });
  }
};





// Add items to an existing list
export const addItemsToList = async (req, res) => {
  const { list_id, items } = req.body;

  try {
    const listItems = items.map((item) => ({
      list_id,
      item_name: item.item_name,
      aisle_number: item.aisle_number,
    }));

    await knex("list_items").insert(listItems);

    res.status(200).json({ message: "Items added to list successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add items to list", error });
  }
};

// Get a list with its items
export const getListWithItems = async (req, res) => {
  const { listId } = req.params;

  try {
    const list = await knex("list").where({ id: listId }).first();

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    const items = await knex("list_items").where({ list_id: listId });

    res.status(200).json({ ...list, items });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch list", error });
  }
};

// Update a list name
export const updateListName = async (req, res) => {
  const { listId } = req.params;
  const { list_name } = req.body;

  try {
    await knex("list").where({ id: listId }).update({ list_name });

    res.status(200).json({ message: "List name updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update list name", error });
  }
};

// Delete a list
export const deleteList = async (req, res) => {
  const { listId } = req.params;

  try {
    await knex("list").where({ id: listId }).del();

    res.status(200).json({ message: "List deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete list", error });
  }
};