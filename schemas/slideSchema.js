const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({}, {timestamps: true, strict: false})

const slideSchema = mongoose.Schema({ images: [imageSchema]}, {timestamps: true, strict: false})

const Slide = mongoose.model('slide', slideSchema)

module.exports = Slide
