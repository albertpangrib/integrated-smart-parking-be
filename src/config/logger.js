const pino = require('pino')
const moment = require('moment')
const pretty = require('pino-pretty')

const logger = pino(
  {
    base: {
      pid: false
    },
    timestamp: () => `, "time":"${moment().format()}"`
  },
  pretty()
)

const logError = (req, error) => {
  logger.error(`[${req.method}]: ${req.originalUrl}\t${typeof error === 'string' ? error : error.details[0].message}`)
}

const logWarn = (req, message) => {
  logger.warn(`[${req.method}]: ${req.originalUrl}\t${message}`)
}

const logInfo = (req, message) => {
  logger.info(`[${req.method}]: ${req.originalUrl}\t${message}`)
}

module.exports = {
  logger,
  logError,
  logWarn,
  logInfo
}
