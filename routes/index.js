// imports express routes, apiRoutes from routes/api/index.js file
const router = require('express').Router();
const apiRoutes = require('./api');

// sets apiRoutes endpoint
router.use('/api', apiRoutes);

// returns error when requested endpoint is incorrect
router.use((req, res) => {
    return res.send('Wrong route!');
});

// exports router to be used by all files requiring "/api" endpoint
module.exports = router;