import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// Controller function to get all items
export const getAllItems = async (req, res) => {
  try {
    const items = await knex('items').select('*');
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Failed to fetch items." });
  }
};
