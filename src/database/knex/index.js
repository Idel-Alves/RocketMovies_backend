const config = require("../../../knexfile.js");
const knex = require("knex");

const connction = knex(config.development);

module.exports = connction;