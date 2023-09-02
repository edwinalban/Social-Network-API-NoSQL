// Imports Schema and model from mongoose
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Creates thought Schema
const thoughtSchema = new Schema(
    {
        // Sets thoughtText SchemaType and validators
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        // Sets createdAt SchemaType
        createdAt: {
            type: Date,
            default: Date.now,
            // add getter method to format timestamp on query
        },
        // Sets username SchemaType
        username: {
            type: String,
            required: true,
        },
        // Sets reactions SchemaType and references reaction Schema
        reactions: [reactionSchema]
    },
    {
        // Sets up JSON virtuals
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

// Calls virtual to get number of reactions per Thought instance
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    })

// Sets thoughtSchema as a model
const Thought = model('thought', thoughtSchema);

// Exports Thought model to be imported by models/index.js
module.exports = Thought;