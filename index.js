const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

const db = require('./config/connection');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
});