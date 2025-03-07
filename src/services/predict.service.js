const axios = require('axios')
const { get, ref } = require('firebase/database')
const { db } = require('../config/firebase')
const path = require('path')
const fs = require('fs')

const FLASK_API = "http://localhost:5000";

const getValidate = async (id) => {
  try {
    const response = await axios.get(`${FLASK_API}/detect/${id}`);
    console.log("/detect", response.data.result)
    if (response.data.result) {
      const imgPlate = await axios.get(`${FLASK_API}/${response.data.result.output_path}`, {
        responseType: 'stream'
      })
      const writer = fs.createWriteStream(path.resolve(__dirname, `../../storage/${response.data.result.output_path}`))
      imgPlate.data.pipe(writer)
    }
    return response.data.result;
  } catch (error) {
    console.error("Error dari Flask API:", error.response ? error.response.data : error.message);
    throw new Error("Gagal mengambil data dari Flask API");
  }
};

const getAllDataFromDb = async () => {
  const snapshot = await get(ref(db, '/'))
  return snapshot.val()
}

module.exports = {
  getAllDataFromDb,
  getValidate
}
