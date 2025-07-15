import './menu-a11y.mjs';
import * as bootstrap from '../bootstrap/bootstrap.min.mjs';

const mainMenu = document.getElementById('popover-main-menu');

mainMenu.showPopover();

mainMenu.addEventListener("beforetoggle", (event) => {
  bootstrap.Tab.getInstance(document.getElementById('main-menu-nav-modulos')).show();
})

export const hideMainMenu = () => {
  mainMenu.hidePopover();
}