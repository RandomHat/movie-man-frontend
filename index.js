import { renderTemplate, setActive, showPage } from './utils.js'
import { setupLoginHandlers, logout } from './js-for-pages/login.js'

import {setupMovieHandlers} from './js-for-pages/movie-search.js'
import { addUserHandlers } from './js-for-pages/signup.js'


function renderMenues(evt) {
  const element = evt.target
  setActive(element)
  const id = element.id
  renderTemplate(id)
  switch (id) {
    case 'page-sign-up': {
      addUserHandlers()
    }
    case 'page-login': {
      setupLoginHandlers()
      break
    }
    case 'page-logout': {
      logout()
      break
    }
    case 'page-movie-search':{
      setupMovieHandlers()
  
    }
  }
}

document.getElementById('menu').onclick = renderMenues
