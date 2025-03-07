const SlotService = require('../services/slot.service')
const HistoryService = require('../services/history.service')

const deleteSlotArea = async (req, res) => {
  const { area, historyId } = req.params

  try {
    await SlotService.updateSlotAreaFromDB(area, false)
    await HistoryService.changeHistory({ id: historyId, status: 'finished' })
    res.status(200).json({ message: 'Berhasil mengubah slot' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

const changeSensor = async (_req, res) => {
  try {
    await SlotService.changeSensorFromDB()
    res.status(200).json({ message: 'Berhasil mengubah sensor' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  deleteSlotArea,
  changeSensor
}
