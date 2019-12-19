const knex = require('knex');

const config = require('../knexfile.js');

const envir = process.env.NODE_ENV || 'development';

module.exports = knex(config[envir]);