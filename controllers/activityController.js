const Activity = require('../schemas/activitySchema')

const { upload, uploadMultiple, uploadPDF } = require('../middleware/uploadsActivity')

const activityListView = async (req, res) => {
    // res.status(200).json({message: 'Success!!'})
    try {
        const activities = await Activity.find()
        res.status(200).json(activities)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const activityCreateOneView = async (req, res) => {
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

                const activity = await Activity.create({ title: req.body.title, slug: req.body.slug, author: req.body.author, content: req.body.content, image: `/uploads/activity/${req.file.filename}` })
                res.status(200).json(activity)
            } catch (error) {
                res.status(400).json({ message: error.message })
            }
        }
    })
}

const activityCreateMultipleView = async (req, res) => {
    // res.status(200).json({message: 'Success!!'})
    uploadMultiple(req, res, async (err) => {
        console.log('Multiple Upload', req.files)
        if (err) {
            res.status(400).json({ message: err.message })
        } else {
            try {
                // console.log(req.body, req.file)
                const activity = await Activity.create({ title: req.body.title, content: req.body.content })
                for (let i = 0; i < req.files.length; i++) {
                    await activity.images.push({ image: `/uploads/activity/${req.files[i].filename}` })
                    await activity.save()
                }
                res.status(200).json(activity)
            } catch (error) {
                res.status(400).json({ message: error.message })
            }
        }
    })
}


const activityCreatePDFView = async (req, res) => {
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
                const activity = await Activity.create({ title: req.body.title, content: req.body.content, pdfFile: `/uploads/activity/${req.file.filename}` })
                res.status(200).json(activity)
            } catch (error) {
                res.status(400).json({ message: error.message })
            }
        }
    })
}


const activityDeleteView = async (req, res) => {
    // res.status(200).json({message: 'Success!!'})
    try {
        const activity = await Activity.findByIdAndDelete(req.params.activityID)
        res.status(200).json(activity)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


const activityDetailView = async (req, res) => {
    try {
        console.log('-->', req.params.activityID);
        const activity = await Activity.findById(req.params.activityID)
        res.status(200).json(activity)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    activityListView,
    activityCreateOneView,
    activityCreateMultipleView,
    activityCreatePDFView,
    activityDeleteView,
    activityDetailView
}
