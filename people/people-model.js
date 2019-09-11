const db = require('../data/dbConfig.js')

module.exports = {
    add,
    find,
    findBy,
    findById,
}

function find() {
    return db('users').select('id', 'username', 'department')
}

function findBy(info) {
    return db('users').where(info)
}

async function add(user) {
    const [id] = await db('users').insert(user)

    return findById(id)
}

function findById(id) {
    return db('users')
        .where({ id })
        .first()
}