require('dotenv').config();
const { MongoClient } = require('mongodb');
const send_mail = require('./sendMail');

// eslint-disable-next-line no-undef
const client = new MongoClient(process.env.DB_URI);
client.connect().then(() => {
  console.log('Connected db')
}).catch((error) => send_mail('Database connection error', JSON.stringify({error:error}), process.env.MAIL_ADR));

module.exports = client;