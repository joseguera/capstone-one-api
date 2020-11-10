const UsersService = {
    getAllUsers(knex) {
        return knex.select('*').from('nom_users')
    },

    insertUser(knex, newUser) {
        return knex
            .insert(newUser)
            .into('nom_users')
            .then(rows => {
                return rows[0]
            });
    },

    getById(knex, id) {
        return knex
            .from('nom_users')
            .select('*')
            .where('id', id)
            .first()
    },

    deleteUser(knex, id) {
        return knex('nom_users')
            .where({ id })
            .delete()
    },

    updateUser(knex, id, newUserFields) {
        return knex('nom_users')
            .where({ id })
            .update(newUserFields)
    },
}

module.exports = UsersService;