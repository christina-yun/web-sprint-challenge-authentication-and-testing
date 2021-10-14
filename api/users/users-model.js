const db = require('./../../data/dbConfig');

function findUserbyId(id){
    return db('users').where('id', id).first();
}

async function add(user){
    const newId = await db('users').insert(user)

    return findUserbyId(newId);
}

module.exports = {
    findUserbyId,
    add
}