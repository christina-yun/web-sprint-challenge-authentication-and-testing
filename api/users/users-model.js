const db = require('./../../data/dbConfig');

function findUserbyId(id){
    return db('users').where('id', id).first();
}

function findBy(filter){
    return db('users')
        .where(filter)
        .first();
}

async function add(user){
    const newId = await db('users').insert(user)

    return findUserbyId(newId);
}

module.exports = {
    findUserbyId,
    findBy,
    add
}