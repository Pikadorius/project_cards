import axios from 'axios';

const instance = axios.create({
    headers: {},
    withCredentials: true,
    baseURL: 'https://'
})

export const cardsAPI = {
    getCards: () => instance.get(`/cards`).then(res => res.data)
}
