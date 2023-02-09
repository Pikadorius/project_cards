import { PATH } from '../constans/path'
import { recoveryURL } from '../constans/url'

export const createMessage = (email: string) => {
  return `<div style=padding: "15px">
            <div>Hi, ${email}!</div>
            <div>There was a request to change your password!</div>
            <div>If you did not make this request then please ignore this email.</div>
            <div>Otherwise, please click this link to change your password: 
            <a href='${recoveryURL}#${PATH.NEW_PASSWORD}/$token$'>[link] </a></div>
            </div>`
}
