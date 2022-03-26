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
  setLoginState(null)
  showPage('page-about')
}

export function setLoginState(token, username) {
  if (token) {
    let loginState = {}
    loginState.loggedIn = token
    loginState.loggedInAs = username
    sessionStorage.setItem('token', loginState)
    console.log(loginState)
  } else {
    sessionStorage.clear('token')
  }
  updateLoginDependentComponents()
}

export function updateLoginDependentComponents() {
  const loggedIn = sessionStorage.getItem('token')
  const loggedInAs = sessionStorage.getItem('logged-in-as')
  document.getElementById('logged-in-user').style.display = 'none'
  document.getElementById('not-logged-in').style.display = 'block'

  if (loggedIn) {
    document.getElementById('not-logged-in').style.display = 'none'
  }
  document.getElementById('page-login').style.display = loggedIn ? 'none' : 'block'
  document.getElementById('page-logout').style.display = loggedIn ? 'block' : 'none'
}
