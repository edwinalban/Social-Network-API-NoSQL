const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);

        } catch (e) {
            res.status(500).json(e);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__V');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);

        } catch (e) {
            res.status(500).json(e);
        }
    },

    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);

        } catch (e) {
            res.status(500).json(e);
        }
    },

    async updateUser(req, res) {
        try {
            let updatedUser = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { returnOriginal: false, runValidators: true });

            if (!updatedUser) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json(updatedUser)

        } catch (e) {
            res.status(500).json(e);
        }
    },

    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });

            if (!deletedUser) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
            res.json({ message: 'User and associated thoughts deleted!' })

        } catch (e) {
            res.json(500).json(e);
        }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });
            if (!user) {
                return req.status(404).json({ message: 'No user with that ID' });
            }
            let friend = req.params.friendId;
            user.friends.push(friend)
            user.save();
            res.json({ message: 'Friend added!' });

        } catch (e) {
            res.status(500).json(e);
        }
    },

    async deleteFriend(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });

            if (!user) {
                return req.status(404).json({ message: 'No user with that ID' });
            }

            let friend = req.params.friendId;
            user.friends.splice(friend);
            user.save();
            res.json({ message: 'Friend deleted!' });

        } catch (e) {
            res.status(500).json(e);
        }
    }
};


