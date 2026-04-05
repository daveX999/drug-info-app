const asyncHandler = require('express-async-handler')

const Drug = require('../models/drugModel')

// @desc Get Drugs
// @route GET /api/drugs
const getDrugs = asyncHandler(async (req, res) => {
    const drugs = await Drug.find({})

    res.status(200).json(drugs)
})

// @desc Create Goals
// @route POST /api/drugs
const createDrug = asyncHandler(async (req, res) => {
    const { name, class: drugClass, mechanism } = req.body

    if (!name || !drugClass || !mechanism) {
        res.status(400)
        throw new Error('Please add a field')
    }

    const drug = await Drug.create({
        name,
        class: drugClass,
        mechanism,
        indications: req.body.indications,
        dosage: req.body.dosage,
        sideEffects: req.body.sideEffects,
        interactions: req.body.interactions,
        contraindications: req.body.contraindications
    })
    

    res.status(200).json(drug)
})

// @desc Get Drug by Id
// @route GET /api/drugs/:id
const getDrugById = asyncHandler(async (req, res) => {
    const drug = await Drug.findById(req.params.id)

    const mongoose = require('mongoose')

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(404)
        throw new Error('Drug not found')
    }

    if (!drug) {
        res.status(400)
        throw new Error('Drug not found')
    }
    
    res.status(200).json(drug)
})

// @desc Update Drug by Id
// @route PUT /api/drugs/:id
const updateDrug = asyncHandler(async (req, res) => {
    const mongoose = require('mongoose')

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(404)
        throw new Error('Drug not found')
    }

    const updatedDrug = await Drug.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    if (!updatedDrug) {
        res.status(400)
        throw new Error('Drug not found')
    }

    res.status(200).json(updatedDrug)
})

// @desc Delete Drug by Id
// @route DELETE /api/drugs/:id
const deleteDrug = asyncHandler(async (req, res) => {
    const mongoose = require('mongoose')

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(404)
        throw new Error('Drug not found')
    }

    const deleteDrug = await Drug.findByIdAndDelete(req.params.id) 

    if (!deleteDrug) {
        res.status(400)
        throw new Error('Drug not found')
    }

    res.status(200).json({message: 'Drug deleted'})
})

module.exports = {
    getDrugs,
    createDrug,
    getDrugById,
    updateDrug,
    deleteDrug
}