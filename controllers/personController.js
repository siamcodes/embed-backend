const Person = require('../schemas/personSchema')

const { upload, uploadMultiple, uploadPDF } = require('../middleware/uploadsPerson')

const personListView = async (req, res) => {
    // res.status(200).json({message: 'Success!!'})
    try {
        const persons = await Person.find()
        res.status(200).json(persons)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const personCreateOneView = async (req, res) => {
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
                  req.body.slug = strToThaiSlug(req.body.fullname);

                const person = await Person.create({ 
                    slug: req.body.slug, 
                    fullname: req.body.fullname, 
                    position: req.body.position, 
                    academic: req.body.academic, 
                    description: req.body.description, 
                    author: req.body.author, 
                    image: `/uploads/person/${req.file.filename}` 
                })
                res.status(200).json(person)
            } catch (error) {
                res.status(400).json({ message: error.message })
            }
        }
    })
}

const personCreateMultipleView = async (req, res) => {
    // res.status(200).json({message: 'Success!!'})
    uploadMultiple(req, res, async (err) => {
        console.log('Multiple Upload', req.files)
        if (err) {
            res.status(400).json({ message: err.message })
        } else {
            try {
                // console.log(req.body, req.file)
                const person = await Person.create({ title: req.body.title, content: req.body.content })
                for (let i = 0; i < req.files.length; i++) {
                    await person.images.push({ image: `/uploads/person/${req.files[i].filename}` })
                    await person.save()
                }
                res.status(200).json(person)
            } catch (error) {
                res.status(400).json({ message: error.message })
            }
        }
    })
}


const personCreatePDFView = async (req, res) => {
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
                const person = await Person.create({ title: req.body.title, content: req.body.content, pdfFile: `/uploads/person/${req.file.filename}` })
                res.status(200).json(person)
            } catch (error) {
                res.status(400).json({ message: error.message })
            }
        }
    })
}


const personDeleteView = async (req, res) => {
    // res.status(200).json({message: 'Success!!'})
    try {
        const person = await Person.findByIdAndDelete(req.params.personID)
        res.status(200).json(person)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


const personDetailView = async (req, res) => {
    try {
       // console.log('-->', req.params.personID);
        const person = await Person.findById(req.params.personID)
        res.status(200).json(person)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { 
    personListView, 
    personCreateOneView, 
    personCreateMultipleView, 
    personCreatePDFView, 
    personDeleteView ,
    personDetailView
}
