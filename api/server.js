const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/user-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send('you are up and runing sir')
})

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

module.exports = server;