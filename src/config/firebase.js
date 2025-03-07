const { initializeApp } = require('firebase/app')
const { getDatabase } = require('firebase/database')

const config = {
  apiKey: 'AIzaSyDChYAA1PbdjgoU_hDr_Ho7FiAxLkeb_jQ',
  projectId: 'ssdesp32cam-smart-parking',
  databaseURL: 'https://ssdesp32cam-smart-parking-default-rtdb.firebaseio.com'
}

const app = initializeApp(config)
const db = getDatabase(app)

const uuid = require('uuid').v4

const generateId = () => {
  return uuid()
}

module.exports = {
  generateId,
  db
}
