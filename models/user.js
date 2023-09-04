// imports Schema and model from mongoose
const { Schema, model } = require('mongoose');

// creates user Schema
const userSchema = new Schema(
    {
        // sets username SchemaType and validators
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true
        },
        // sets email SchemaType and validators
        email: {
            type: String,
            unique: true,
            required: true,
            match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        },
        // sets thoughts SchemaType
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        // sets friends SchemaType
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    },
    {
        // sets up JSON virtuals
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

// calls virtual to get number of friends per User instance
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    })

// sets userSchema as a model
const User = model('user', userSchema);

// exports User model to be imported by models/index.js
module.exports = User;