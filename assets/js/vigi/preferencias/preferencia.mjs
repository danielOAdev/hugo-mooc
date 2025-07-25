
import { getValorDoCookie, setValorDoCookie } from '../cookies.mjs'

export class Preferencia {
    /**
     * Nome da preferência.
     */
    static get nome()   { return '' }
    static get padrao() { return null }

    static get valor() {
        const preferencias = this.getTodasAsPreferencias();
        return preferencias[this.nome] ?? this.padrao;
    };

    static set valor(valor) {
        let preferencias = this.getTodasAsPreferencias();
        const valorAntigo = this.valor;
        preferencias[this.nome] = valor;
        this.aoMudar(preferencias[this.nome], valorAntigo);
        setValorDoCookie('vigi_preferencias', JSON.stringify(preferencias));
        return valor;
    }

    static getTodasAsPreferencias() {
        const json = getValorDoCookie('vigi_preferencias')
        if (json) {
            return JSON.parse(json);
        } else {
            return {};
        }
    }

    /**
     * Esquece preferência do usuário removendo-a do cookie.
     */
    static esquecer() {
        const preferencias = this.getTodasAsPreferencias();
        if (preferencias[this.nome]) {
            const valorAntigo = preferencias[this.nome];
            const resultado = delete preferencias[this.nome];
            setValorDoCookie('vigi_preferencias', JSON.stringify(preferencias));
            this.aoMudar(this.padrao, valorAntigo);
            return resultado;
        }
        return false;
    }

    /**
     * Essa preferência está salva no cookie?
     * @returns {Boolean}
     */
    static isDefinida() {
        const preferencias = this.getTodasAsPreferencias();
        return preferencias.hasOwnProperty(this.nome);
    }

    /**
     * Executa ao mudar de valor.
     */
    static aoMudar(valorNovo, valorAntigo) {
        // Implementar ao extender
    }
}