const express = require('express')
const { slideListView, slideCreateOneView, slideDeleteView, slideCreateMultipleView, slideCreatePDFView, slideDetailView } = require('../controllers/slideController')

const upload = require('../middleware/uploadsSlide')
const router = express.Router()

router.get('/', slideListView)

router.post('/createOne', slideCreateOneView)
router.post('/createMultiple', slideCreateMultipleView)
router.post('/createPDF', slideCreatePDFView)
router.delete('/delete/:slideID', slideDeleteView)
router.get('/:slideID', slideDetailView)

module.exports = router