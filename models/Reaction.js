// imports Schema/Types from mongoose and formatDate function from utils/formatDate.js
const { Schema, Types } = require('mongoose');
const formatDate = require('../utils/formatDate');

// creates reactionSchema Schema
const reactionSchema = new Schema(
    {
        // sets reactionId SchemaType
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        // sets reactionBody SchemaType and maximum length
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        // sets username SchemaType
        username: {
            type: String,
            required: true
        },
        // sets createdAt SchemaType/formats date
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => formatDate(date)
        }
    },
    {
        // sets up JSON getters
        toJSON: {
            getters: true
        },
        id: false
    }
);

// exports reactionSchema to be used by Thought model
module.exports = reactionSchema;