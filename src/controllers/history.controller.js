const HistoryService = require('../services/history.service')

const getHistories = async (req, res) => {
  const { status } = req.query

  try {
    if (status) {
      const histories = await HistoryService.getHistoryByStatus(status)
      return res.status(200).json(histories)
    }

    const histories = await HistoryService.getHistoriesFromDB()
    res.status(200).json(histories)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getHistory = async (req, res) => {
  const { historyId } = req.params

  try {
    const histories = await HistoryService.getHistoryById(historyId)
    res.status(200).json(histories)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

const deleteHistory = async (req, res) => {
  const { historyId } = req.params

  try {
    const histories = await HistoryService.deleteHistoryFromDB(historyId)
    res.status(200).json(histories)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

const deleteHistories = async (_req, res) => {
  try {
    const histories = await HistoryService.deleteAllHistoriesFromDB()
    res.status(200).json(histories)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  getHistories,
  getHistory,
  deleteHistory,
  deleteHistories
}
