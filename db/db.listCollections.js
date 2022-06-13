const client = require('../db/db');

const listCollections = async () => await client.db('Imdb').listCollections().toArray();

module.exports = listCollections;
