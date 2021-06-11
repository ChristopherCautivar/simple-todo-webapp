
exports.up = function(knex) {
    //changes and initialization of table
    return knex.schema.createTable("todos", tbl => {
        tbl.increments(); // defaults to primary with name id
        // create/update timestamps in datetime form
        tbl.timestamps(false,true);
        tbl.boolean("completed")
        .notNullable();
        tbl.text("title")
        .notNullable();
        tbl.text("description");
        tbl.integer("weight");
        tbl.datetime("time_estimate");
        tbl.datetime("due_date");
    })
    .createTable("groups", tbl => {
        tbl.increments();
        tbl.timestamps(false,true);
        tbl.text("title")
        .notNullable();
        tbl.text("description");
        tbl.unique("title");
    })
    .createTable("related_groups", tbl => {
        tbl.timestamps(false,true);
        // foreign key to todos table
        tbl.integer("member_id")
        .unsigned()
        .references("id")
        .inTable("todos")
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
        tbl.integer("group_id")
        .unsigned()
        .references("id")
        .inTable("groups")
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
        tbl.primary(["group_id","member_id"])
    })
    .createTable("tags", tbl => {
        tbl.increments();
        tbl.timestamps(false,true);
        tbl.text("title")
        .notNullable();
        tbl.integer("suggested_weight");
        tbl.text("description");
        tbl.unique("title");
    })
    .createTable("tag_groups", tbl => {
        tbl.timestamps(false,true);
        tbl.integer("todo_id")
        .unsigned()
        .references("id")
        .inTable("todos")
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
        tbl.integer("tag_id")
        .unsigned()
        .references("id")
        .inTable("tags")
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
        tbl.primary(["todo_id","tag_id"])
    })
    .createTable("prerequisite_groups", tbl => {
        tbl.timestamps(false,true);
        tbl.integer("parent_id")
        .unsigned()
        .references("id")
        .inTable("todos")
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
        tbl.integer("child_id")
        .unsigned()
        .references("id")
        .inTable("todos")
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
        tbl.primary(["parent_id","child_id"])
    })
};

exports.down = function(knex) {
    //undo and rollback changes
    return knex.schema.dropTableIfExists("todos")
    .dropTableIfExists("tag_groups")
    .dropTableIfExists("tags")
    .dropTableIfExists("related_groups")
    .dropTableIfExists("groups")
    .dropTableIfExists("prerequisite_groups")
};
