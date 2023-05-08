exports.up = function(knex) {
    return knex.schema.createTable('pets', function(table) {
      table.string('type', 5).notNullable();
      table.string('name', 12).notNullable();
      table.string('adoption_status', 9).notNullable();
      table.string('picture', 79).nullable();
      table.integer('height').notNullable();
      table.integer('weight').notNullable();
      table.string('color', 19).notNullable();
      table.string('bio', 30).nullable();
      table.boolean('hypoallergenic').notNullable();
      table.json('dietary_restrictions').nullable();
      table.string('breed', 40).notNullable();
      table.string('pet_id', 50).primary();
      table.string('user_id', 50).nullable().index();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('pets');
  };
  