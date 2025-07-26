import Preferencia from "../preferencia.mjs";

export default class AutoExibir extends Preferencia {
    static get nome()   { return 'autoExibir' }
    static get padrao() { return false }

    static aoMudar(valorNovo, valorAntigo) {
        if (valorNovo) {
            document.body.classList.add('auto-exibir');
        } else {
            document.body.classList.remove('auto-exibir');
        }
    }
}

AutoExibir.inicializar();
