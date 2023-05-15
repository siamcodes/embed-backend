const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({}, {timestamps: true, strict: false})

const personSchema = mongoose.Schema({ images: [imageSchema]}, {timestamps: true, strict: false})

const Person = mongoose.model('person', personSchema)

module.exports = Person
