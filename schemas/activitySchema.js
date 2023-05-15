const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({}, {timestamps: true, strict: false})

const activitySchema = mongoose.Schema({ images: [imageSchema]}, {timestamps: true, strict: false})

const Activity = mongoose.model('activity', activitySchema)

module.exports = Activity
