// imports express router
const router = require('express').Router();

// imports getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, and deleteFriend
// functions from userControllers.js
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userControllers');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

// exports router to be used by index.js
module.exports = router;