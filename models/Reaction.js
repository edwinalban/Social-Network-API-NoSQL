// imports Schema and Types from mongoose
const { Schema, Types } = require('mongoose')

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
        // sets createdAt SchemaType
        createdAt: {
            type: Date,
            default: Date.now,
            // get: (date) => formatDate(date)
        }
    }
);

// exports reactionSchema to be used by Thought model
module.exports = reactionSchema;