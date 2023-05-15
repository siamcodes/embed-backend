const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({}, {timestamps: true, strict: false})

const blogSchema = mongoose.Schema({ images: [imageSchema]}, {timestamps: true, strict: false})

const Blog = mongoose.model('blog', blogSchema)

module.exports = Blog
