const mongoose = require('mongoose')
const Schema = mongoose.Schema
const user = require('./userModel')

const addictionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    addictionType: {
        type: String,
        required: true,
        enum: ['smoking', 'alcohol', 'sugar', 'porn']
    },
    goals: {
        type: String,
        required: true
    },
    relapses: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            note: {
                type: String
            }
        }
    ],
    lastRelapse: {
        date: {
            type: Date,
        },
        note: {
            type: String
        }
    },
    streak: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Tracker", addictionSchema)