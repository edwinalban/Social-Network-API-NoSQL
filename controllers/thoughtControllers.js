const { User, Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);

        } catch (e) {
            res.status(500).json(e);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__V');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);

        } catch (e) {
            res.status(500).json(e);
        }
    },

    async createThought(req, res) {
        try {
            const newThought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                {username: req.body.username},
                {$addToSet: { thoughts: newThought._id}},
                {new: true}
            );

            if (!user) {
                return res.status(404).json({message: 'Thought created, but no user with that username found.'})
            }
            res.json(newThought);

        } catch (e) {
            res.status(500).json(e);
        }
    },

    async updateThought(req, res) {
        try {
            let updatedThought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { returnOriginal: false, runValidators: true });

            if (!updatedThought) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json(updatedThought)

        } catch (e) {
            res.status(500).json(e);
        }
    },

    async deleteThought(req, res) {
        try {
            const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!deletedThought) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            const user = await User.findOneAndUpdate(
                {thoughts: req.params.thoughtId},
                {$pull: { thoughts: deletedThought._id}},
                {new: true}
            );

            if (!user) {
                return res.status(404).json({ message: 'Thought deleted, but no user with that ID' });
            }

            res.json({ message: 'Thought deleted!' })

        } catch (e) {
            res.json(500).json(e);
        }
    },
};