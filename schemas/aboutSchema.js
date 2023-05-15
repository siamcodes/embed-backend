const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({}, {timestamps: true, strict: false})

const aboutSchema = mongoose.Schema({ images: [imageSchema]}, {timestamps: true, strict: false})

const About = mongoose.model('about', aboutSchema)

module.exports = About
