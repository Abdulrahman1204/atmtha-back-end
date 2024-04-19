const router = require('express').Router()
const validateObjectId = require('../middlewares/validateObjectId')
const { createUnitCtrl, getAllUnitCtrl, getUnitsCtrl, updateUnitCtrl, deleteUnitCtrl, getAllUnitAdminCtrl } = require('../controllers/unitController')
const { verifyToken } = require('../middlewares/verifyToken')
const { verifySubscription } = require('../middlewares/verifyCode')

// /api/units
router.route('/').post(createUnitCtrl).get( verifyToken, verifySubscription, getAllUnitCtrl)


// /api/units
router.route('/admins').get( verifyToken, getAllUnitAdminCtrl)


// /api/units/:id
router.route('/:id').get( validateObjectId, getUnitsCtrl).put( validateObjectId, updateUnitCtrl ).delete( validateObjectId, deleteUnitCtrl )

module.exports = router
