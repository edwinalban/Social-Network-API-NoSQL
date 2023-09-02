// Imports Schema from mongoose
const { Schema } = require('mongoose')

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // getter method to format timestamp
        }
    }
);

module.exports = reactionSchema;