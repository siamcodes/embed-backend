const Course = require('../schemas/courseSchema')

const { upload, uploadMultiple, uploadPDF } = require('../middleware/uploadsCourse')

const courseListView = async (req, res) => {
    // res.status(200).json({message: 'Success!!'})
    try {
        const courses = await Course.find()
        res.status(200).json(courses)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const courseCreateOneView = async (req, res) => {
    // res.status(200).json({message: 'Success!!'})
    upload(req, res, async (err) => {
        if (err) {
            res.status(400).json({ message: err.message })
        } else {
            try {
                // console.log(req.body, req.file)
                let strToThaiSlug = function (str) {
                    return str.replace(/\s+/g, '-')     // Replace spaces with -
                        .replace('%', 'เปอร์เซนต์')         // Translate some charactor
                        .replace(/[^\u0E00-\u0E7F\w-]+/g, '') // Remove all non-word chars
                        .replace(/--+/g, '-')         // Replace multiple - with single -
                        .replace(/^-+/, '')           // Trim - from start of text
                        .toLowerCase()
                        .replace(/-+$/, '');
                }
                req.body.slug = strToThaiSlug(req.body.title);

                const course = await Course.create({ courseID: req.body.courseID, courseType: req.body.courseType, major: req.body.major, title: req.body.title, slug: req.body.slug, author: req.body.author, content: req.body.content, image: `/uploads/course/${req.file.filename}` })
                res.status(200).json(course)
            } catch (error) {
                res.status(400).json({ message: error.message })
            }
        }
    })
}


const courseCreateMultipleView = async (req, res) => {
    // res.status(200).json({message: 'Success!!'})
    uploadMultiple(req, res, async (err) => {
        console.log('Multiple Upload', req.files)
        if (err) {
            res.status(400).json({ message: err.message })
        } else {
            try {
                // console.log(req.body, req.file)
                const course = await Course.create({ title: req.body.title, content: req.body.content })
                for (let i = 0; i < req.files.length; i++) {
                    await course.images.push({ image: `/uploads/course/${req.files[i].filename}` })
                    await course.save()
                }
                res.status(200).json(course)
            } catch (error) {
                res.status(400).json({ message: error.message })
            }
        }
    })
}


const courseCreatePDFView = async (req, res) => {
    // res.status(200).json({message: 'Success!!'})
    uploadPDF(req, res, async (err) => {
        console.log('PDF Upload', req.file)
        if (err) {
            res.status(400).json({ message: err.message })
        } else if (req.error) {

            res.status(400).json({ message: req.error.message })
        } else {
            try {
                // console.log(req.body, req.file)
                const course = await Course.create({ title: req.body.title, content: req.body.content, pdfFile: `/uploads/course/${req.file.filename}` })
                res.status(200).json(course)
            } catch (error) {
                res.status(400).json({ message: error.message })
            }
        }
    })
}


const courseDeleteView = async (req, res) => {
    // res.status(200).json({message: 'Success!!'})
    try {
        const course = await Course.findByIdAndDelete(req.params.courseID)
        res.status(200).json(course)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


const courseDetailView = async (req, res) => {
    try {
        console.log('Hi -->',req.params.courseID);
       // const inUser = req.user.courses.find(course => {
        //    return course._id.toString() === req.params.courseID
        //})

        //if (inUser) {
            const course = await Course.findById(req.params.courseID)
            res.status(200).json(course)
        //} else {
        //    const course = await Course.findById(req.params.courseID, { title: 1, image: 1, content: 1 })
        //    res.status(200).json(course)
       // }

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    courseListView,
    courseCreateOneView,
    courseCreateMultipleView,
    courseCreatePDFView,
    courseDeleteView,
    courseDetailView
}
