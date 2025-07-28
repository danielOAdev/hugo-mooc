// Módulos do site
export { default as Tema } from './preferencias/a11y/tema.mjs'
export * as mainMenu from './menu.mjs'
export * as cookieBanner from './cookie-banner.mjs'
export { inicializar } from './gtag/gtag-comandos.mjs'

document.body.classList.remove('d-none')