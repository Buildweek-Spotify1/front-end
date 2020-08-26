const { default: Axios } = require("axios");

export const authAxios = () => {
  const token = localStorage.getItem('token')

  return Axios.create({
    baseURL: 'https://spotify1-pt-bw.herokuapp.com/api/auth/signup',
    headers: {
      authorization: token
    }
  })
}