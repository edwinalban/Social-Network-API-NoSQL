// imports Schema and model from mongoose and reactionSchema from Reaction.js
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

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
        // sets createdAt SchemaType
        createdAt: {
            type: Date,
            default: Date.now,
            // add getter method to format timestamp on query
        },
        // sets username SchemaType
        username: {
            type: String,
            required: true,
        },
        // sets reactions SchemaType and references reaction Schema
        reactions: [reactionSchema]
    },
    {
        // sets up JSON virtuals
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

// calls virtual to get number of reactions per Thought instance
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    })

// sets thoughtSchema as a model
const Thought = model('thought', thoughtSchema);

// exports Thought model to be imported by models/index.js
module.exports = Thought;