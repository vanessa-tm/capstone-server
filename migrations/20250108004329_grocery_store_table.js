/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema
    .createTable("items", (table) => {
        table.increments("id").primary();
        table.string("aisle_name").notNullable();
        table.string("aisle_number").notNullable();
        table.string("item_name").notNullable();
    });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable("items");
};
