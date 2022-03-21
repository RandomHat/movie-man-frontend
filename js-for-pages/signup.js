import { SERVER } from '../settings.js'

const URL = SERVER + '/api/users'

export function addUserHandlers() {
  document.getElementById('btn-sign-up').onclick = addUser
}

function addUser() {
  const user = {}

  user.username = document.getElementById('username').value
  user.password = document.getElementById('password').value

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(user),
  }

  fetch(URL, options)
    .then((res) => res.json())
    .then((newUser) => {
      console.log(JSON.stringify(newUser))
    })
    .catch((e) => console.error(e))
}
