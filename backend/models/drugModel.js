const mongoose = require('mongoose')

const drugSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        class: {
            type: String,
            required: true
        },
        mechanism: {
            type: String,
            required: true
        },
        indications: [
            {
                type: String
            }
        ],
        dosage: {
            type: String
        },
        sideEffects: [
            {
                type: String
            }
        ],
        interactions: [
            {
                type: String
            }
        ],
        contraindications: [
            {
                type: String
            }
        ]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Drug', drugSchema)