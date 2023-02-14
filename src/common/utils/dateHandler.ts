import dayjs from 'dayjs'

export const dateHandler = (date: Date) => {
  return dayjs(date).format('DD.MM.YYYY HH:mm:ss')
}
