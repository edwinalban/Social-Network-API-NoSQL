// imports User and Thought models from models folder
const { User, Thought } = require('../models');

// exports getUsers, getSingleUser, createUser, updateUser, and deleteUser functions
module.exports = {
    // finds all Users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);

        } catch (e) {
            res.status(500).json(e);
        }
    },

    // finds single User by request parameters userId
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__V');

            // if no user found, returns error message
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);

        } catch (e) {
            res.status(500).json(e);
        }
    },

    // creates new User
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);

        } catch (e) {
            res.status(500).json(e);
        }
    },

    // finds User by request parameters userId and udpates User model instance
    // sets User values to new request body
    // returns updated User instance
    async updateUser(req, res) {
        try {
            let updatedUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { returnOriginal: false, runValidators: true }
            );
            
            // if no user found, returns error message
            if (!updatedUser) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json(updatedUser)

        } catch (e) {
            res.status(500).json(e);
        }
    },

    // finds User by request parameters userId and deletes User model instance
    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });

            // if no user found, returns error message
            if (!deletedUser) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            // deletes Thoughts associated with deleted user
            await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
            res.json({ message: 'User and associated thoughts deleted!' })

        } catch (e) {
            res.json(500).json(e);
        }
    },

    // adds friend to User friends array
    async addFriend(req, res) {
        try {

            // finds User by request parameters userId
            const user = await User.findOne({ _id: req.params.userId });

            // if no user found, returns error message
            if (!user) {
                return req.status(404).json({ message: 'No user with that ID' });
            }

            // sets friend to request paramaters friendId and adds id to friends array
            // in User model instance
            const friend = req.params.friendId;
            user.friends.push(friend)
            user.save();
            res.json({ message: 'Friend added!' });

        } catch (e) {
            res.status(500).json(e);
        }
    },

    // removes friend from User model instance
    async deleteFriend(req, res) {
        try {

            // finds User by request parameters userId
            const user = await User.findOne({ _id: req.params.userId });

            // if no user found, returns error message
            if (!user) {
                return req.status(404).json({ message: 'No user with that ID' });
            }

            // sets friend to request parameters friendId and removes id from friends array
            // in User model instance
            const friend = req.params.friendId;
            user.friends.remove(friend);
            user.save();
            res.json({ message: 'Friend deleted!' });

        } catch (e) {
            res.status(500).json(e);
        }
    }
};


