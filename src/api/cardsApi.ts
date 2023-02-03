import axios from 'axios';

const instance = axios.create({
    headers: {},
    withCredentials: true,
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/'
})

export const cardsAPI = {
    getCards: () => instance.get(`/cards`).then(res => res.data)
}
