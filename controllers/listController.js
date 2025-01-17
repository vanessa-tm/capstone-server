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




export const updateItemsInList = async (req, res) => {
  const { listId } = req.params;
  const { items } = req.body;

  try {
    // Iterate through the items and update them if they exist, otherwise insert them
    const updatedItemsPromises = items.map(async (item) => {
      const existingItem = await knex("list_items")
        .where({ list_id: listId, item_name: item.item_name })
        .first();

      if (existingItem) {
        // Update the item if it exists
        await knex("list_items")
          .where({ id: existingItem.id })
          .update({ aisle_number: item.aisle_number });
      } else {
        // Insert new item if it does not exist
        await knex("list_items").insert({
          list_id: listId,
          item_name: item.item_name,
          aisle_number: item.aisle_number,
        });
      }
    });

    await Promise.all(updatedItemsPromises); // Wait for all updates/inserts to complete

    res.status(200).json({ message: "Items updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update items", error });
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