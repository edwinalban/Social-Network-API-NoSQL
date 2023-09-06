// imports express router, Thought model, and reactionSchema Schema
const express = require('express').Router();
const { Thought, reactionSchema } = require('../models');

// exports addReaction/deleteReaction functions
module.exports = {

    // adds reaction to Thought model instance
    async addReaction(req, res) {
        try {
            
            // finds Thought by thoughtID in request parameters
            // adds reaction request body to array in Thought instance
            // returns updated Thought instance
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true }
            );

            // if no Thought found, returns error message
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' })
            }

            res.json(thought)

        } catch (e) {
            res.status(500).json(e)
        }
    },

    // removes reaction from Thought model instance
    async deleteReaction(req, res) {
        try {

            // finds Thought by request parameters thoughtId
            const thought = await Thought.findOne({ _id: req.params.thoughtId })

            // if no Thought found, returns error message
            if (!thought) {
                res.status(404).json({ message: 'No thought with this id!' })
            }

            // sets reaction variable to reactionId in request parameters
            // pulls object from reactions array in Thought instance based on reactionId value
            // saves Thought instance after update
            const reaction = req.params.reactionId;
            thought.reactions.pull({reactionId: reaction});
            thought.save()
            res.json({message: 'Reaction deleted!'})

        } catch (e) {
            res.status(500).json(e)
        }
    }
};