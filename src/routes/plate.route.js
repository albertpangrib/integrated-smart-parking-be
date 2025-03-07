const express = require('express')
const { storePlate, getPlates, deletePlate, deletePlates } = require('../controllers/plate.controller')

const plateRoute = express.Router()

plateRoute.post('/', storePlate)
plateRoute.get('/', getPlates)
plateRoute.delete('/:plateId', deletePlate)
plateRoute.delete('/', deletePlates)

module.exports = { plateRoute }
