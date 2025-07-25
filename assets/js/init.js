/**
 * Algumas coisas que precisamos definir antes de começar.
 * @author Daniel de Oliveira Araujo <danieloadev@gmail.com>
 * @copyright Daniel de Oliveira Araujo 2025
 */

/**
 * Classe contendo funções de ajuda.
 */
class Vigi {
    static getPreferencia(nome) {
        const defaults = {
            tema: 'auto',
            tamanhoDoTexto: 1
        }
        const json = document.cookie
            .split("; ")
            .find((row) => row.startsWith('vigi_preferencias='))
            ?.split("=")[1];
    
        if (json) {
            const preferencias = JSON.parse(json);
            return preferencias[nome] ?? defaults[nome];
        }
    }

    static getNomeDoTemaEmPreferencia() {
        const tema = Vigi.getPreferencia('tema') ?? 'auto';
        if ( tema === 'auto') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        } else {
            return tema;
        }
    }
}

/**
 * Essas funções já existem em módulos.
 * Mas módulos só começam a ser executados depois do documento ser parseado.
 * Esse atraso na execução torna perceptivel a troca entre o visual padrão do site e o definido pelo o usuário.
 * Executa-las aqui nos permite aplicar o visual definido pelo o usuário antes mesmo do conteúdo ser exibido.
 */
// Altera o atributo "data-bs-theme" do elemento <html>.
document.documentElement.setAttribute('data-bs-theme', Vigi.getNomeDoTemaEmPreferencia());

// Aplica a escala à propriedade de estilo "font-size" do elemento <html>.
document.documentElement.style.setProperty("font-size", `${Vigi.getPreferencia('tamanhoDoTexto')}em`);