const { push, ref, get, remove, set } = require('firebase/database')
const { generateId, db } = require('../config/firebase')

const plateRef = ref(db, 'plates')

const addNewPlate = async (plate, area) => {
  const newPlate = {
    id: generateId(),
    plate,
    area
  }

  push(plateRef, newPlate)
  return newPlate
}

const getPlatesFromDB = async () => {
  const snapshot = await get(plateRef)
  const platesArray = Object.entries(snapshot.val()).map(([id, data]) => ({ firebaseId: id, ...data }))
  return platesArray
}

const getPlateById = async (id) => {
  const plates = await getPlatesFromDB()
  const plate = plates.find((plate) => plate.id === id)
  return plate
}

const deletePlateFromDB = async (id) => {
  await remove(ref(db, `plates/${id}`))
}

const deleteAllPlatesFromDB = async () => {
  await set(plateRef, null)
}

module.exports = {
  addNewPlate,
  getPlatesFromDB,
  getPlateById,
  deletePlateFromDB,
  deleteAllPlatesFromDB
}
