const ListsService = {
    getAllLists(knex) {
        return knex.select('*').from('lists');
    },

    insertList(knex, newList) {
        return knex
            .insert(newList)
    }
}