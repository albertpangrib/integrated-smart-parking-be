// MODULES
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

// UTILITY
const { logger } = require('./src/config/logger')
const { routes } = require('./src/routes')

// connect to db

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(cors())
app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

// routes
routes(app)

app.use('/tmp', express.static(path.join(__dirname, './storage/tmp')))

app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`)
})
