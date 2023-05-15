const express = require('express')
const { courseListView, courseCreateOneView, courseDeleteView, courseCreateMultipleView, courseCreatePDFView, courseDetailView } = require('../controllers/courseController')

const upload = require('../middleware/uploadsCourse')
const router = express.Router()

router.get('/', courseListView)
router.post('/createOne', courseCreateOneView)
router.post('/createMultiple', courseCreateMultipleView)
router.post('/createPDF', courseCreatePDFView)
router.delete('/delete/:courseID', courseDeleteView)
router.get('/:courseID', courseDetailView)

module.exports = router
