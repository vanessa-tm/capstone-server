/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable("store_data", (table) => {
        table.increments("id").primary();
        table.string("aisle_name").notNullable();
        table.integer("aisle_number").notNullable();
        table.string("item_name").notNullable();
    });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("store_data");
};
