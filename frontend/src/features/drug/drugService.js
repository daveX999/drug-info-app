import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || ''
const API_URL = `${BASE_URL}/api/drugs`

// Create a drug
const createDrug = async (drugData) => {
    const response = await axios.post(API_URL, drugData)
    return response.data
}

// Get all drugs
const getDrugs = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

// Get by Id
const getDrugById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
}

// Update
const updateDrug = async (id, drugData) => {
    const response = await axios.put(`${API_URL}/${id}`, drugData)
    return response.data
}

// DELETE
const deleteDrug = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`)
  return response.data
}

const drugService = {
    createDrug,
    getDrugs,
    getDrugById,
    updateDrug,
    deleteDrug
}

export default drugService