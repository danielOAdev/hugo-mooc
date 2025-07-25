import './menu-a11y.mjs';
import './menu-privacidade.mjs';
import * as bootstrap from '../bootstrap/bootstrap.min.mjs';

const mainMenu = document.getElementById('main-menu');

mainMenu.addEventListener("beforetoggle", (event) => {
  const tabName = event.target.currentTab
  if (tabName) {
    bootstrap.Tab.getOrCreateInstance(document.getElementById(`main-menu-${tabName}-tab`)).show();
    event.target.currentTab = null;
  } else {
    bootstrap.Tab.getOrCreateInstance(document.getElementById('main-menu-modulos-tab')).show();
  }
})

export function showMainMenu(tabName = 'module') {
  mainMenu.currentTab = tabName;
  mainMenu.showPopover();
}

export function hideMainMenu() {
  mainMenu.hidePopover();
}
