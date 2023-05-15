const express = require('express')
const { 
    postListView, 
    postCreateOneView, 
    postDeleteView, 
    postCreateMultipleView, 
    postCreatePDFView,
    postDetailView,
    postUpdateView
 } = require('../controllers/postController')

const upload = require('../middleware/uploadsPost')
const router = express.Router()

router.get('/', postListView)

router.post('/createOne', postCreateOneView)
router.post('/createMultiple', postCreateMultipleView)
router.post('/createPDF', postCreatePDFView)
router.delete('/delete/:postID', postDeleteView)
router.get('/:postID', postDetailView)
router.put('/update/:postID', postUpdateView)

module.exports = router