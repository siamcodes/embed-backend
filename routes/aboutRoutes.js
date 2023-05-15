const express = require('express')
const { 
    aboutListView, 
    aboutCreateOneView, 
    aboutDeleteView, 
    aboutCreateMultipleView, 
    aboutCreatePDFView, 
    aboutDetailView 
} = require('../controllers/aboutController')

const upload = require('../middleware/uploadsBlog')
const router = express.Router()

router.get('/', aboutListView)
router.post('/createOne', aboutCreateOneView)
router.post('/createMultiple', aboutCreateMultipleView)
router.post('/createPDF', aboutCreatePDFView)
router.delete('/delete/:aboutID', aboutDeleteView)
router.get('/:aboutID', aboutDetailView)

module.exports = router