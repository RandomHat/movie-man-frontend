import { showPage } from '../utils.js'
import { makeOptions } from '../fetchUtils.js'
import { SERVER } from '../settings.js'

const URL = SERVER + '/api/users/login'

export function setupLoginHandlers() {
  document.getElementById('btn-login').onclick = login
}

function login() {
  const user = {}
  user.username = document.getElementById('username').value
  user.password = document.getElementById('password').value

  fetch(URL, makeOptions('POST', user))
    .then((res) => {
      if (!res.ok) {
        if (res.status == 401) {
          return Promise.reject('Wrong Username or Password')
        }
      }
      return res.json()
    })
    .then((response) => {
      const token = response
      setLoginState(token, user.username)
      showPage('page-about')
    })
    .catch((e) => {
      document.getElementById('login-error').innerText = e
    })
}

export function logout() {
  setLoginState()
  showPage('page-about')
}

export function setLoginState(token, username) {
  if (token) {
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('username', username)
  } else {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('username')
  }
  updateLoginDependentComponents()
}

export function updateLoginDependentComponents() {
  const loggedIn = sessionStorage.getItem('token')
  const loggedInAs = sessionStorage.getItem('username')

  document.getElementById('logged-in-user').style.display = loggedIn ? 'block' : 'none'
  document.getElementById('logged-in-user').innerText = 'Logged in as user: ' + loggedInAs
  document.getElementById('not-logged-in').style.display = loggedIn ? 'none' : 'block'
  document.getElementById('page-login').style.display = loggedIn ? 'none' : 'block'
  document.getElementById('page-logout').style.display = loggedIn ? 'block' : 'none'
}
