const { set, ref } = require('firebase/database')
const { db } = require('../config/firebase')

const bookedSlotsRef = (area) => ref(db, `esp32cam/slot_${area}/isBooked/`)
// console.log(area)

const updateSlotAreaFromDB = async (area, isBooked) => {
  console.log(area, isBooked)
  await set(bookedSlotsRef(area), !!isBooked)
}

const createSlotAreaToDB = async (area) => {
  await set(bookedSlotsRef(area), false)
}

const changeSensorFromDB = async () => {
  await set(ref(db, 'test/sensor1'), 1)
}

module.exports = {
  updateSlotAreaFromDB,
  createSlotAreaToDB,
  changeSensorFromDB
}
