const express = require('express')
const { getHistories, getHistory, deleteHistory, deleteHistories } = require('../controllers/history.controller')

const historyRoute = express.Router()

historyRoute.get('/', getHistories)
historyRoute.get('/:historyId', getHistory)
historyRoute.delete('/:historyId', deleteHistory)
historyRoute.delete('/', deleteHistories)

module.exports = { historyRoute }
