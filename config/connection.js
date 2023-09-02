// Imports connect and connection from mongoose
const { connect, connection } = require('mongoose');

// Connects to db in mongoDB
connect('mongodb://127.0.0.1:27017/');

// Exports connection to be used by index.js
module.exports = connection;