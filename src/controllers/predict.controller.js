const PredictService = require('../services/predict.service')
const PlateService = require('../services/plate.service')
const HistoryService = require('../services/history.service')

const validation = async (req, res) => {
  if (!req.file) return res.status(422).json({ message: 'Foto wajib diisi' })
  if (!req.body.plateId) return res.status(422).json({ message: 'PlateId wajib ada' })
  if (!req.body.historyId) return res.status(422).json({ message: 'historyId wajib ada' })

  const file = req.file
  const plateId = req.body.plateId
  const historyId = req.body.historyId

  try {
    const data = await PredictService.predictToMl(file)
    console.log({ data })

    if (!data) {
      return res.status(400).json({ message: 'Foto gagal diekstraksi coba ambil gambar lagi' })
    }

    const plateRes = await PlateService.getPlateById(plateId)
    console.log({ plateRes })

    if (plateRes?.plate?.toString() !== data.License_Plate?.result?.toString()) {
      return res.status(400).json({ message: 'Plate tidak sesuai dengan foto yang diupload' })
    }

    if (plateRes?.area?.toString() !== data['slot-sign']?.result?.toString()) {
      return res.status(400).json({ message: 'Slot tidak sesuai dengan foto yang diupload' })
    }

    const results = await HistoryService.changeHistory({ id: historyId, data, status: 'booked' })

    res.status(200).json(results)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

const resultValidation = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID yang diterima:", id);
    if (!id) {
      return res.status(400).json({ message: "ID slot kamera diperlukan" });
    }

    const data = await PredictService.getValidate(id);

    console.log("data controller: ", data)
    res.status(200).json(data);
  } catch (error) {
    console.error("Error di Controller:", error.message);
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getAllData = async (_req, res) => {
  try {
    const plates = await PredictService.getAllDataFromDb()
    res.status(200).json(plates)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

const validationTesting = async (req, res) => {
  if (!req.file) return res.status(422).json({ message: 'Foto wajib diisi' })
  if (!req.body.plateId) return res.status(422).json({ message: 'Plate wajib ada' })
  if (!req.body.historyId) return res.status(422).json({ message: 'Slot wajib ada' })

  const plateId = req.body.plateId
  const historyId = req.body.historyId

  console.log('dihit testing')

  try {
    const detailPlate = await PlateService.getPlateById(plateId)

    const data = await PredictService.predictToMlTesting(detailPlate.plate, detailPlate.area)
    console.log({ data })

    const plateRes = await PlateService.getPlateById(plateId)
    console.log({ plateRes })

    if (plateRes.plate.toString() !== data.License_Plate?.result.toString()) {
      return res.status(400).json({ message: 'Plate tidak sesuai dengan foto yang diupload' })
    }

    if (plateRes.area.toString() !== data['slot-sign']?.result.toString()) {
      return res.status(400).json({ message: 'Slot tidak sesuai dengan foto yang diupload' })
    }

    const results = await HistoryService.changeHistory({ id: historyId, data, status: 'booked' })

    res.status(200).json(results)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  validation,
  getAllData,
  validationTesting,
  resultValidation
}
