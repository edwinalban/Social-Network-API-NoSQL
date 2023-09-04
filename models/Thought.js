// imports Schema/model from mongoose, reactionSchema from Reaction.js, and formatDate
// function from utils/formatDate.js
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const formatDate = require('../utils/formatDate');

// creates thought Schema
const thoughtSchema = new Schema(
    {
        // sets thoughtText SchemaType and validators
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        // sets createdAt SchemaType/formats date
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => formatDate(date)
        },
        // sets username SchemaType
        username: {
            type: String,
            required: true
        },
        // sets reactions SchemaType and references reaction Schema
        reactions: [reactionSchema]
    },
    {
        // sets up JSON virtuals
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
);

// calls virtual to get number of reactions per Thought instance
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

// sets thoughtSchema as a model
const Thought = model('thought', thoughtSchema);

// exports Thought model to be imported by models/index.js
module.exports = Thought;