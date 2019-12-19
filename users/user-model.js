const databass = require('../data/dbConfig.js');

module.exports = {
    allUser,
    FindByUsername,
    addUser
}

function allUser(){
    return databass('users').select('id', 'username', 'department').orderBy('id')
}

function FindByUsername(name){
    return databass('users').select('id', 'username', 'password', 'department').where(name);
}

function addUser(data){
    return databass('users').insert(data, 'id')
    .then(ids => {
        const [id] = ids;
        return userId(id)
    })
}

function userId(id){
    return databass('users').select('id', 'username').where({ id }).first()
}