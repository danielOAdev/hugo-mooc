import './menu-a11y.js';

const mainMenu = document.getElementById('popover-main-menu');

mainMenu.showPopover();

mainMenu.addEventListener("beforetoggle", (event) => {
  bootstrap.Tab.getInstance(document.getElementById('main-menu-nav-modulos')).show();
})

export const hideMainMenu = () => {
  mainMenu.hidePopover();
}