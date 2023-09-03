const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require('./routes');

const db = require('./config/connection');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
});