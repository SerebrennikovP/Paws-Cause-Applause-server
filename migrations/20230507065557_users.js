exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.string('id', 36).primary();
      table.string('email', 255).notNullable().unique();
      table.string('password', 255).notNullable();
      table.string('phone', 20).notNullable();
      table.string('name', 50).notNullable();
      table.string('lastname', 50).notNullable();
      table.string('bio', 255).nullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };  