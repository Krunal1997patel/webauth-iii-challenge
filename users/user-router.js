const express = require('express');
const userDB = require('./user-model.js');
const restricted = require('../auth/restricted.js');

const router = express.Router();

router.get('/', restricted,  (req, res) => {

    userDB.allUser()
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({
            error: 'can not get all the user'
        })
    })

})


module.exports = router