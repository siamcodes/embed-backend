const Slide = require('../schemas/slideSchema')

const { upload, uploadMultiple, uploadPDF } = require('../middleware/uploadsSlide')

const slideListView = async (req, res) => {
    // res.status(200).json({message: 'Success!!'})
    try {
        const slides = await Slide.find()
        res.status(200).json(slides)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const slideCreateOneView = async (req, res) => {
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

                const slide = await Slide.create({ title: req.body.title, slug: req.body.slug, author: req.body.author, content: req.body.content, image: `/uploads/slide/${req.file.filename}` })
                res.status(200).json(slide)
            } catch (error) {
                res.status(400).json({ message: error.message })
            }
        }
    })
}

const slideCreateMultipleView = async (req, res) => {
    // res.status(200).json({message: 'Success!!'})
    uploadMultiple(req, res, async (err) => {
        console.log('Multiple Upload', req.files)
        if (err) {
            res.status(400).json({ message: err.message })
        } else {
            try {
                // console.log(req.body, req.file)
                const slide = await Slide.create({ title: req.body.title, content: req.body.content })
                for (let i = 0; i < req.files.length; i++) {
                    await slide.images.push({ image: `/uploads/slide/${req.files[i].filename}` })
                    await slide.save()
                }
                res.status(200).json(slide)
            } catch (error) {
                res.status(400).json({ message: error.message })
            }
        }
    })
}


const slideCreatePDFView = async (req, res) => {
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
                const slide = await Slide.create({ title: req.body.title, content: req.body.content, pdfFile: `/uploads/slide/${req.file.filename}` })
                res.status(200).json(slide)
            } catch (error) {
                res.status(400).json({ message: error.message })
            }
        }
    })
}


const slideDeleteView = async (req, res) => {
    // res.status(200).json({message: 'Success!!'})
    try {
        const slide = await Slide.findByIdAndDelete(req.params.slideID)
        res.status(200).json(slide)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


const slideDetailView = async (req, res) => {
    try {
        console.log('-->', req.params.slideID);
        const slide = await Slide.findById(req.params.slideID)
        res.status(200).json(slide)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { 
    slideListView, 
    slideCreateOneView, 
    slideCreateMultipleView, 
    slideCreatePDFView, 
    slideDeleteView ,
    slideDetailView
}
