import axios from 'axios'

export const authAxios = () => {
  const token = localStorage.getItem('token')

  return axios.create({
    baseURL: 'https://spotify1-pt-bw.herokuapp.com/api',
    headers: {
      authorization: token
    }
  })
}