const NomsService = {
    getAllNoms(knex) {
        return knex.select('*').from('noms');
    },

    insertNom(knex, newNom) {
        return knex
            .insert(newNom)
            .into('noms')
            .returning('*')
            .then(rows => {
                return rows[0];
            });
    },

    getById(knex, id) {
        return knex
            .from('noms')
            .select('*')
            .where('id', id)
            .first()
    },

    deleteNom(knex, id) {
        return knex('noms')
            .where({ id })
            .delete()
    },

    updateNom(knex, id, newNomFields) {
        return knex('noms')
            .where({ id })
            .update(newNomFields)
    }
};

module.exports = NomsService;