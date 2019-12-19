const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userDB = require('../users/user-model.js');
const router = express.Router();


router.post('/register', (req, res) => {
    const body = req.body;
    const hash = bcrypt.hashSync(body.password, 8);

   if(!body.username || !body.password || !body.department){
       res.status(400).json({
            message: 'please provied name and password'
       })
   }else{
        
    body.password = hash

       userDB.addUser(body)
       .then(user => {
           res.status(201).json(user)
       })
       .catch(err => {
           res.status(500).json({
               error: 'can not sign up'
           })
       })
   }
})

router.post('/login', (req, res) =>{
    const {username, password} = req.body;

    if(!username || !password){
        res.status(400).json({
            message: 'please prove username or password'
        })
    }else{
        
        userDB.FindByUsername({username}).first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){

                const token = signToken(user)

                res.status(201).json({
                    message: `Welcome back ${user.username}`,
                    token,
                    user
                })

            }else{
                
                res.status(401).json({
                    message: 'wrong username or password'
                })

            }
        })
        .catch(err => {
            res.status(500).json({
                error: 'user can not login'
            })
        })
    }

})


function signToken(user){

    const payload = {
        username: user.username,
        department: user.department
    }

    const secret = process.env.JWT_SECRET || ' this is a secret, you are not support to know'

    const options = {
        expiresIn: "1d",
    }

    return jwt.sign(payload, secret, options)
}


module.exports = router;