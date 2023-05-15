const About = require('../schemas/aboutSchema')

const { upload, uploadMultiple, uploadPDF } = require('../middleware/uploadsAbout')

const aboutListView = async (req, res) => {
    // res.status(200).json({message: 'Success!!'})
    try {
        const abouts = await About.find()
        res.status(200).json(abouts)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const aboutCreateOneView = async (req, res) => {
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

                const about = await About.create({ title: req.body.title, slug: req.body.slug, author: req.body.author, content: req.body.content, image: `/uploads/about/${req.file.filename}` })
                res.status(200).json(about)
            } catch (error) {
                res.status(400).json({ message: error.message })
            }
        }
    })
}

const aboutCreateMultipleView = async (req, res) => {
    // res.status(200).json({message: 'Success!!'})
    uploadMultiple(req, res, async (err) => {
        console.log('Multiple Upload', req.files)
        if (err) {
            res.status(400).json({ message: err.message })
        } else {
            try {
                // console.log(req.body, req.file)
                const about = await About.create({ title: req.body.title, content: req.body.content })
                for (let i = 0; i < req.files.length; i++) {
                    await about.images.push({ image: `/uploads/about/${req.files[i].filename}` })
                    await about.save()
                }
                res.status(200).json(about)
            } catch (error) {
                res.status(400).json({ message: error.message })
            }
        }
    })
}


const aboutCreatePDFView = async (req, res) => {
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
                const about = await About.create({ title: req.body.title, content: req.body.content, pdfFile: `/uploads/about/${req.file.filename}` })
                res.status(200).json(about)
            } catch (error) {
                res.status(400).json({ message: error.message })
            }
        }
    })
}


const aboutDeleteView = async (req, res) => {
    // res.status(200).json({message: 'Success!!'})
    try {
        const about = await About.findByIdAndDelete(req.params.aboutID)
        res.status(200).json(about)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const aboutDetailView = async (req, res) => {
    try {
        console.log('-->', req.params.aboutID);
        const about = await About.findById(req.params.aboutID)
        res.status(200).json(about)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    aboutListView,
    aboutCreateOneView,
    aboutCreateMultipleView,
    aboutCreatePDFView,
    aboutDeleteView,
    aboutDetailView
}
