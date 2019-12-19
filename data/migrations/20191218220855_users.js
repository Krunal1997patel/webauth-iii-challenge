
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments();

        table.string('username', 50).notNullable().unique();

        table.string('password', 50).notNullable();

        table.string('department', 50).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
