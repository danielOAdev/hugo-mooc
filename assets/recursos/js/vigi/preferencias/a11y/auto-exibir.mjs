import Preferencia from "../preferencia.mjs";
import { autoExibirTodos } from "../../pista.mjs";

export default class AutoExibir extends Preferencia {
    static get nome()   { return 'autoExibir' }
    static get padrao() { return false }

    static aoMudar(valorNovo, valorAntigo) {
        autoExibirTodos(valorNovo);
    }
}

AutoExibir.inicializar();
