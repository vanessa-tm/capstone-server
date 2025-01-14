import itemsData from "../seed-data/items.js";

export async function seed(knex) {
  await knex ("items").del();
  await knex ("items").insert(itemsData);
}