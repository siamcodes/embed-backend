const express = require('express')
const { blogListView, blogCreateOneView, blogDeleteView, blogCreateMultipleView, blogCreatePDFView, blogDetailView } = require('../controllers/blogController')

const upload = require('../middleware/uploadsBlog')
const router = express.Router()

router.get('/', blogListView)

router.post('/createOne', blogCreateOneView)
router.post('/createMultiple', blogCreateMultipleView)
router.post('/createPDF', blogCreatePDFView)
router.delete('/delete/:blogID', blogDeleteView)
router.get('/:blogID', blogDetailView)

module.exports = router