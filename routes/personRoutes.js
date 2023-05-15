const express = require('express')
const { personListView, personCreateOneView, personDeleteView, personCreateMultipleView, personCreatePDFView, personDetailView } = require('../controllers/personController')

const upload = require('../middleware/uploadsPerson')
const router = express.Router()

router.get('/', personListView)

router.post('/createOne', personCreateOneView)
router.post('/createMultiple', personCreateMultipleView)
router.post('/createPDF', personCreatePDFView)
router.delete('/delete/:personID', personDeleteView)
router.get('/:personID', personDetailView)

module.exports = router