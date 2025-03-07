const PlateService = require('../services/plate.service')
const SlotService = require('../services/slot.service')
const HistoryService = require('../services/history.service')

const storePlate = async (req, res) => {
  const { plate, area } = req.body

  try {
    const detailPlate = await PlateService.addNewPlate(plate, area)
    console.log(plate, area)
    await SlotService.updateSlotAreaFromDB(area, true)
    const history = await HistoryService.addNewHistory({ plate: detailPlate, status: 'pending' })
    console.log(history)
    res.status(201).json({ plate: detailPlate, history })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getPlates = async (_req, res) => {
  try {
    const plates = await PlateService.getPlatesFromDB()
    res.status(200).json(plates)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

const deletePlate = async (req, res) => {
  const { plateId } = req.params

  try {
    const plates = await PlateService.deletePlateFromDB(plateId)
    res.status(200).json(plates)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

const deletePlates = async (_req, res) => {
  try {
    const plates = await PlateService.deleteAllPlatesFromDB()
    res.status(200).json(plates)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  storePlate,
  getPlates,
  deletePlate,
  deletePlates
}
