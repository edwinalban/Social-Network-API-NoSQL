const express = require('express').Router();
const { Thought, reactionSchema } = require('../models');

module.exports = {
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' })
            }

            res.json(thought)

        } catch (e) {
            res.status(500).json(e)
        }
    },

    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })

            if (!thought) {
                res.status(404).json({ message: 'No thought with this id!' })
            }

            const reaction = req.params.reactionId;
            thought.reactions.pull({reactionId: reaction});
            thought.save()
            res.json({message: 'Reaction deleted!'})

        } catch (e) {
            res.status(500).json(e)
        }
    }
};