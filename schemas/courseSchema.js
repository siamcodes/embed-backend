const mongoose = require('mongoose');
const imageSchema = mongoose.Schema({}, {timestamps: true, strict: false});
const courseSchema = mongoose.Schema({ images: [imageSchema]}, {timestamps: true, strict: false});
const Course = mongoose.model('course', courseSchema);
module.exports = Course;
