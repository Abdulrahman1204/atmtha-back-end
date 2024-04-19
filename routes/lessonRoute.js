const router = require('express').Router()
const validateObjectId = require('../middlewares/validateObjectId')
const { createLessonCtrl, getAllLessonCtrl, getLessonCtrl, deleteLessonCtrl, updateLessonCtrl } = require('../controllers/lessonController.js')

// /api/lesson
router.route('/').post(createLessonCtrl).get(getAllLessonCtrl)

// /api/lesson/:id
router.route('/:id').get( validateObjectId, getLessonCtrl).delete( validateObjectId, deleteLessonCtrl ).put( validateObjectId, updateLessonCtrl )

module.exports = router
