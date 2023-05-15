const Blog = require('../schemas/blogSchema')

const { upload, uploadMultiple, uploadPDF } = require('../middleware/uploadsBlog')

const blogListView = async (req, res) => {
    // res.status(200).json({message: 'Success!!'})
    try {
        const blogs = await Blog.find()
        res.status(200).json(blogs)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const blogCreateOneView = async (req, res) => {
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

                const blog = await Blog.create({ title: req.body.title, slug: req.body.slug, author: req.body.author, content: req.body.content, image: `/uploads/blog/${req.file.filename}` })
                res.status(200).json(blog)
            } catch (error) {
                res.status(400).json({ message: error.message })
            }
        }
    })
}

const blogCreateMultipleView = async (req, res) => {
    // res.status(200).json({message: 'Success!!'})
    uploadMultiple(req, res, async (err) => {
        console.log('Multiple Upload', req.files)
        if (err) {
            res.status(400).json({ message: err.message })
        } else {
            try {
                // console.log(req.body, req.file)
                const blog = await Blog.create({ title: req.body.title, content: req.body.content })
                for (let i = 0; i < req.files.length; i++) {
                    await blog.images.push({ image: `/uploads/blog/${req.files[i].filename}` })
                    await blog.save()
                }
                res.status(200).json(blog)
            } catch (error) {
                res.status(400).json({ message: error.message })
            }
        }
    })
}


const blogCreatePDFView = async (req, res) => {
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
                const blog = await Blog.create({ title: req.body.title, content: req.body.content, pdfFile: `/uploads/blog/${req.file.filename}` })
                res.status(200).json(blog)
            } catch (error) {
                res.status(400).json({ message: error.message })
            }
        }
    })
}


const blogDeleteView = async (req, res) => {
    // res.status(200).json({message: 'Success!!'})
    try {
        const blog = await Blog.findByIdAndDelete(req.params.blogID)
        res.status(200).json(blog)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


const blogDetailView = async (req, res) => {
    try {
        console.log('-->', req.params.blogID);
        const blog = await Blog.findById(req.params.blogID)
        res.status(200).json(blog)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { 
    blogListView, 
    blogCreateOneView, 
    blogCreateMultipleView, 
    blogCreatePDFView, 
    blogDeleteView ,
    blogDetailView
}
