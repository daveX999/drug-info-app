const express = require('express')
const router = express.Router()
const {getDrugs, createDrug, getDrugById, updateDrug, deleteDrug} = require('../controllers/drugControllers')

router.route('/').get(getDrugs).post(createDrug)
router.route('/:id').get(getDrugById).put(updateDrug).delete(deleteDrug)

module.exports = router