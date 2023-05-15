const Post = require('../schemas/postSchema')

const { upload, uploadMultiple, uploadPDF } = require('../middleware/uploadsPost')

const postListView = async (req, res) => {
    // res.status(200).json({message: 'Success!!'})
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const postCreateOneView = async (req, res) => {
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

                const post = await Post.create({ title: req.body.title, content: req.body.content, description: req.body.description, slug: req.body.slug, author: req.body.author, image: `/uploads/post/${req.file.filename}` })
                res.status(200).json(post)
            } catch (error) {
                res.status(442).json({ message: error.message })
            }
        }
    })
}

const postCreateMultipleView = async (req, res) => {
    // res.status(200).json({message: 'Success!!'})
    uploadMultiple(req, res, async (err) => {
        console.log('Multiple Upload', req.files)
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

                const post = await Post.create({ title: req.body.title, content: req.body.content, description: req.body.description, slug: req.body.slug, author: req.body.author })
                for (let i = 0; i < req.files.length; i++) {
                    await post.images.push({ image: `/uploads/post/${req.files[i].filename}` })
                    await post.save()
                }
                res.status(200).json(post)
            } catch (error) {
                res.status(400).json({ message: error.message })
            }
        }
    })
}


const postCreatePDFView = async (req, res) => {
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
                const post = await Post.create({ title: req.body.title, content: req.body.content, pdfFile: `/uploads/post/${req.file.filename}` })
                res.status(200).json(post)
            } catch (error) {
                res.status(400).json({ message: error.message })
            }
        }
    })
}

//Delete
const postDeleteView = async (req, res) => {
    // res.status(200).json({message: 'Success!!'})
    try {
        const post = await Post.findByIdAndDelete(req.params.postID)
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//Update
const postUpdateView = async (req, res) => {
    // res.status(200).json({message: 'Success!!'})
    
    try {
        const post = await Post.findById(req.params.postID)
        console.log('Hi-->',req.body)
      //  if (post.user.equals(req.user._id)) {
            const updatePost = await Post.findByIdAndUpdate(req.params.postID, req.body, { new: true })
            if (updatePost) {
                console.log('POST-->',updatePost)
                res.status(200).json(updatePost)
            } else {
                res.status(403).json({ message: 'There was a problem updating the post' })
            }
      //  } else {
      //      res.status(403).json({ message: 'Only the owner of the post can update this post' })
      //  }

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//Detail
const postDetailView = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postID)
        res.status(200).json(post)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    postListView,
    postCreateOneView,
    postCreateMultipleView,
    postCreatePDFView,
    postDeleteView,
    postDetailView,
    postUpdateView
}
