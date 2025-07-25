import { Preferencia } from "../preferencia.mjs";

export default class GA extends Preferencia {
    static get nome()   { return 'GA' }
    static get padrao() { return false }

    static aoMudar(valorNovo, valorAntigo) {
        gtag('consent', 'update', {'analytics_storage': valorNovo ? 'granted' : 'denied'});
    }
}
