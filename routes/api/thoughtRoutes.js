// imports express router
const router = require('express').Router();

// imports getThoughts, getSingleThought, createThought, updateThought, deleteThought
// functions from thoughtControllers.js
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtControllers');

// imports addReaction/deleteReaction functions from reactionControllers.js
const {
    addReaction,
    deleteReaction
} = require('../../controllers/reactionControllers');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// exports router to be used by routes/index.js
module.exports = router;