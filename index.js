import { renderTemplate, setActive, showPage } from './utils.js'
import { setupLoginHandlers, logout } from './js-for-pages/login.js'

function renderMenues(evt) {
  const element = evt.target
  setActive(element)
  const id = element.id
  renderTemplate(id)
  switch (id) {
    case 'page-login': {
      setupLoginHandlers()
      break
    }
    case 'page-logout': {
      logout()
      break
    }
  }
}

document.getElementById('menu').onclick = renderMenues
