/**
 * Apenas um wrapper de alguams funções de cookies especificas para preferências que possui como
 * valor um JSON.
 * @author Daniel de Oliveira Araujo <danieloadev@gmail.com>
 * @copyright Daniel de Oliveira Araujo 2025
 */

import { getValorDoCookie, setValorDoCookie } from './cookies.mjs'



function getTodasAsPreferencias() {
    const json = getValorDoCookie('vigi_preferencias')
    if (json) {
        return JSON.parse(json);
    } else {
        return null;
    }
}

function getPreferencia(nome) {
    const preferencias = getTodasAsPreferencias();
    return preferencias[nome];
};

function setPreferencia(nome, valor) {
    setValorDoCookie()
}

