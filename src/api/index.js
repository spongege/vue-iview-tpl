import axios from './axios'

export default {
  getTest: (params = {}) => axios.get('/api/test', { params }),
  postTest: (params = {}) => axios.post('/api/test', params)
}
