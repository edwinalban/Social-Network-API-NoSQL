// imports User and Thought models from models folder
const { User, Thought } = require('../models');

// exports getThoughts, getSingleThought, createThought, updateThought, and deleteThought functions
module.exports = {
    // finds all Thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);

        } catch (e) {
            res.status(500).json(e);
        }
    },

    // finds single Thought by thoughtId in request parameters
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__V');

            // if no Thought found, returns error message
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);

        } catch (e) {
            res.status(500).json(e);
        }
    },

    // creates Thought model instance
    async createThought(req, res) {
        try {
            const newThought = await Thought.create(req.body);
            // finds User model instance by username, adds newThought to thoughts array
            // returns updated User
            const user = await User.findOneAndUpdate(
                {username: req.body.username},
                {$addToSet: { thoughts: newThought._id}},
                {new: true}
            );
            
            // if no User found, returns error message
            if (!user) {
                return res.status(404).json({message: 'Thought created, but no user with that username found.'})
            }
            res.json(newThought);

        } catch (e) {
            res.status(500).json(e);
        }
    },

    // updates Thought model instance
    async updateThought(req, res) {
        try {
            // finds Thought by request parameters thoughtId
            // sets the Thought body to the request body
            // returns new thought and runs validators
            let updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { returnOriginal: false, runValidators: true }
            );
            
            // if no thought found, returns error message
            if (!updatedThought) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json(updatedThought)

        } catch (e) {
            res.status(500).json(e);
        }
    },

    // deletes Thought 
    async deleteThought(req, res) {
        try {
            // finds Thought model instance by request parameters thoughtId
            const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            // if no thought found, returns error message
            if (!deletedThought) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            // finds User model instance by request parameters thoughtId
            // removes thought from User thoughts array
            // returns updated User
            const user = await User.findOneAndUpdate(
                {thoughts: req.params.thoughtId},
                {$pull: { thoughts: deletedThought._id}},
                {new: true}
            );

            // if no user found, returns error message
            if (!user) {
                return res.status(404).json({ message: 'Thought deleted, but no user with that ID' });
            }

            res.json({ message: 'Thought deleted!' })

        } catch (e) {
            res.json(500).json(e);
        }
    },
};