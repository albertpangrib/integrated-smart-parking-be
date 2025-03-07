const express = require('express')
const { getAllData, resultValidation } = require('../controllers/predict.controller')
const upload = require('../middlewares/multer')

const predictRoute = express.Router()

predictRoute.get('/', getAllData)
predictRoute.get('/validateResult/:id', resultValidation)

module.exports = { predictRoute }
