import { setPreferenciaGA, getPreferenciaGA } from './cookies.mjs';

const tabPrivacidade = document.getElementById('main-menu-nav-privacidade');
const toggleGA = document.getElementById('toggle-ga');

setToggleGA(Boolean(getPreferenciaGA()));

toggleGA.addEventListener('change', event => {
  setPreferenciaGA(Boolean(event.target.checked));
});

tabPrivacidade.addEventListener('show.bs.tab', event => {
  setToggleGA(Boolean(getPreferenciaGA()));
});

export function setToggleGA(bool) {
  if (toggleGA.checked !== bool) {
    toggleGA.checked = bool;
  }
}