const { push, get, set, ref, remove } = require('firebase/database')
const { generateId, db } = require('../config/firebase')

const historyRef = ref(db, 'histories')

const getHistoriesFromDB = async () => {
  const snapshot = await get(historyRef)

  if (snapshot.val() === null) {
    return []
  }

  const histories = Object.entries(snapshot.val()).map(([id, data]) => ({ firebaseId: id, ...data }))
  return histories
}

const getHistoryById = async (id) => {
  const histories = await getHistoriesFromDB()
  const history = histories.find((history) => history.id === id)
  console.log("ini history by ID: ", history)
  return history
}

const getHistoryByStatus = async (status) => {
  const histories = await getHistoriesFromDB()
  const history = histories.find((history) => history.status === status)
  if (!history) return {}
  return history
}

const addNewHistory = async ({ plate, data, status = 'pending' }) => {
  const newHistory = {
    id: generateId(),
    plate,
    status,
    date: new Date().toISOString(),
    results: data || null
  }

  push(historyRef, newHistory)
  return newHistory
}

const changeHistory = async ({ id, status = 'pending', data }) => {
  const history = await getHistoryById(id)

  let newHistory = { ...history, date: new Date().toISOString(), status }
  if (data) {
    newHistory = { ...newHistory, results: data }
  }

  const { firebaseId, ...rest } = newHistory
  await set(ref(db, `histories/${history.firebaseId}`), rest)
  return newHistory
}

const deleteHistoryFromDB = async (id) => {
  await remove(ref(db, `histories/${id}`))
}

const deleteAllHistoriesFromDB = async () => {
  await set(historyRef, null)
}

module.exports = {
  getHistoriesFromDB,
  getHistoryById,
  getHistoryByStatus,
  addNewHistory,
  changeHistory,
  deleteHistoryFromDB,
  deleteAllHistoriesFromDB
}
