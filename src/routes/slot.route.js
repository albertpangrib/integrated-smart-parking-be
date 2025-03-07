const express = require('express')
const { deleteSlotArea } = require('../controllers/slot.controller')

const slotRoute = express.Router()

slotRoute.delete('/:area/history/:historyId', deleteSlotArea)

module.exports = { slotRoute }
