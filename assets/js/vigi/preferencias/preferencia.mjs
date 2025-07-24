
import { getValorDoCookie, setValorDoCookie } from '../cookies.mjs'

export class Preferencia {
    /**
     * Nome da preferência.
     */
    static get nome()   { return '' }
    static get padrao() { return null }

    static get valor() {
        const preferencias = this.getTodasAsPreferencias();
        if (Object.keys(preferencias).length !== 0) {
            return preferencias[this.nome];
        }
        return this.padrao;
    };

    static set valor(valor) {
        let preferencias = this.getTodasAsPreferencias();
        if (!preferencias) {
            preferencias = {};
        }
        const valorAntigo = preferencias[this.nome];
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
            return null;
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

    static isDefinida() {
        const preferencias = this.getTodasAsPreferencias();
        return preferencias.hasOwnProperty(this.nome);
    }

    /**
     * Executa ao mudar de valor.
     */
    static aoMudar(valorNovo, valorAntigo) {}
}