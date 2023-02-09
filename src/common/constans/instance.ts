import axios from 'axios'

import { baseURL } from './url'

export const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
})

export const instanceRec = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})
