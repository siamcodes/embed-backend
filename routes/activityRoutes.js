const express = require('express')
const { activityListView, activityCreateOneView, activityDeleteView, activityCreateMultipleView, activityCreatePDFView, activityDetailView } = require('../controllers/activityController')

const upload = require('../middleware/uploadsActivity')
const router = express.Router()

router.get('/', activityListView)
router.post('/createOne', activityCreateOneView)
router.post('/createMultiple', activityCreateMultipleView)
router.post('/createPDF', activityCreatePDFView)
router.delete('/delete/:activityID', activityDeleteView)
router.get('/:activityID', activityDetailView)

module.exports = router