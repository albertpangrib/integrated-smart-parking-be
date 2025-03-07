const multer = require('multer')
const logger = require('../config/logger')
const uuid = require('uuid').v4

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'tmp')
  },
  filename: (req, file, cb) => {
    cb(null, uuid() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp', 'image/svg']
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    logger.info('File type not supported')
    cb(new Error('File type not supported', false))
  }
}

const upload = multer({
  storage,
  fileFilter
})

module.exports = upload
