// Imports Schema and model from mongoose
const { Schema, model } = require('mongoose');

// Creates user Schema
const userSchema = new Schema(
    {
        // Sets username SchemaType and validators
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true
        },
        // Sets email SchemaType and validators
        email: {
            type: String,
            unique: true,
            required: true,
            match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        },
        // Sets thoughts SchemaType
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        // Sets friends SchemaType
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    },
    {
        // Sets up JSON virtuals
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

// Calls virtual to get number of friends per User instance
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    })

// Sets userSchema as a model
const User = model('user', userSchema);

// Exports User model to be imported by models/index.js
module.exports = User;