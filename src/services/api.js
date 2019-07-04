import axios from 'axios'

const api = axios.create({
    baseURL: 'https://cindrate-backend.herokuapp.com'
})

export default api;