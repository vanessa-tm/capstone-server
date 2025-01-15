/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema
    .createTable("list", (table) => {
        table.increments("id").primary();
        table.string("list_name").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    })

    .createTable("list_items", (table) => {
        table.increments("id").primary();
        table
            .integer("list_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("list")
            .onDelete("CASCADE");
        
        table.string("item_name").notNullable();
        table.string("aisle_number").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema
        .dropTableIfExists("list_items")
        .dropTableIfExists("list");
};
