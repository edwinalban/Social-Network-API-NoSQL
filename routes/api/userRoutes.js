const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userControllers');

router.route('/users').get(getUsers).post(createUser).put(updateUser).delete(deleteUser);

router.route('users/:userId').get(getSingleUser);

router.route('users/:userId/friends/:friendId').put(addFriend).delete(deleteFriend);

module.exports = router;