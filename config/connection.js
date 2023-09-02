// Imports connect and connection from mongoose
const mongoose = require('mongoose');

// Connects to db in mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB');

// Exports connection to be used by index.js
module.exports = mongoose.connection;