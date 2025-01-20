/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const up = function(knex) {
    return knex.schema
    .alterTable("list_items", (table) => {
        table.boolean("checked").defaultTo(false); 
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const down = function(knex) {
    return knex.schema
    .alterTable("list_items", (table) => {
        table.dropColumn("checked"); 
    });
  
};
