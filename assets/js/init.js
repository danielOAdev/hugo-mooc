/**
 * Essas funções já existem em módulos.
 * Mas módulos só começam a ser executados depois do documento ser parseado.
 * Esse atraso na execução torna perceptivel a troca entre o visual padrão do site e o definido pelo o usuário.
 * Essa cópia nos permite aplicar o visual definido pelo o usuário antes mesmo do conteúdo ser exibido.
 * @author Daniel de Oliveira Araujo <danieloadev@gmail.com>
 * @copyright Daniel de Oliveira Araujo 2025
 */

setVigiConfigTema(getVigiConfigTema());
setVigiConfigTamanhoDoTexto(getVigiConfigTamanhoDoTexto());

/**
 * Retorna a preferência de tema do usuário.
 * @returns {string} auto, light, dark ou highcontrast
 */
function getVigiConfigTema() {
  const storedTheme = localStorage.getItem('preferenciaTema')
  if (storedTheme && storedTheme !== 'auto') {
    return storedTheme
  }
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Altera o atributo "data-bs-theme" do elemento <html>.
 * @param {string} tema auto, light, dark ou highcontrast
 */
function setVigiConfigTema(tema) {
  if (tema === 'auto') {
    document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
  } else {
    document.documentElement.setAttribute('data-bs-theme', tema)
  }
}

/**
 * Retorna a preferência de tamanho do texto do usuário.
 * @returns {string} 1, 1.25, 1.5
 */
function getVigiConfigTamanhoDoTexto() {
  const tamanhoDoTexto = localStorage.getItem('preferenciaTamanhoDoTexto');
  if (tamanhoDoTexto) {
    return tamanhoDoTexto;
  } else {
    return '1';
  }
}

/**
 * Aplica a escala à propriedade de estilo "font-size" do elemento <html>.
 * @param {string} TamanhoDoTexto 1, 1.25, 1.5
 */
function setVigiConfigTamanhoDoTexto(TamanhoDoTexto) {
  document.documentElement.style.setProperty("font-size", `${TamanhoDoTexto}em`);
}
