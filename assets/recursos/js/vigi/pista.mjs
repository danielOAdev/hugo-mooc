document.addEventListener('click', function(event) {
    const vigiPista = event.target.closest('.vigi-pista');

    if (vigiPista) {
        event.preventDefault();
        vigiPista.classList.add('show');
    }
});

// =========================
//            2.0           
// =========================

/**
 * @constant
 * @type {Pista[]}
 */
export const instancias = [];

/**
 * Pista
 *
 * @class Pista
 * @typedef {Pista}
 */
export class Pista {
    constructor(input) {
        if (!input.matches('label *:first-child')) {
            throw new Error('O elemento deve ser o primeiro filho de um elemento "label".');
        }

        if (!input.matches('input')) {
            throw new Error('O elemento deve ser um "input".');
        }

        if (!input.matches('[name="pista"]')) {
            throw new Error('O elemento deve possuir o atributo "name" com valor "pista".');
        }

        this.input = input;

        this.#salvaAtributosOriginais();
        this.#atualizaAtributos();

        this.input.addEventListener('change', () => {
            this.#atualizaAtributos();
        });

        this.pai.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.pai.click();
            }
        });

        instancias.push(this);
    }

    get pai() {
        return this.input.parentElement;
    }

    get elementos() {
        return this.pai.querySelectorAll('*:not(input[name="pista"])');
    }

    #salvaAtributosOriginais() {
        this.elementos.forEach(elemento => {
            if (!elemento.dataset.hasOwnProperty('tabindexOriginal')
                &&  elemento.matches(`
                    audio,
                    button,
                    canvas,
                    details,
                    iframe,
                    input,
                    select,
                    summary,
                    textarea,
                    video,
                    [accesskey],
                    [contenteditable],
                    [href],
                    [tabindex]
                `)
            ) {
                elemento.dataset.tabindexOriginal = elemento.getAttribute('tabindex') ?? '0';
            }
        });
    }

    #atualizaAtributos(externo = false) {
        this.elementos.forEach(elemento => {
            if (elemento.dataset.hasOwnProperty('tabindexOriginal')) {
                this.eExibido()
                    ? elemento.setAttribute('tabindex', elemento.dataset.tabindexOriginal)
                    : elemento.setAttribute('tabindex', '-1');
            } else {
                this.eExibido()
                    ? elemento.removeAttribute('tabindex')
                    : elemento.setAttribute('tabindex', '-1');
            }
            if (elemento.dataset.hasOwnProperty('pistaHidden')) {
                this.eExibido()
                    ? elemento.removeAttribute('hidden')
                    : elemento.setAttribute('hidden', elemento.dataset.pistaHidden);
            }
        });
        if (this.eExibido()) {
            if (!externo) this.input.classList.add('pista-exibida');
            this.input.setAttribute('disabled', '');
            this.pai.removeAttribute('tabindex');
        } else {
            this.input.removeAttribute('disabled');
            this.pai.setAttribute('tabindex', this.pai.getAttribute('tabindex') ?? '0');
        }
    };

    eExibido() {
        return this.input.checked
    }

    setExibido(valor) {
        if (!valor && this.input.classList.contains('pista-exibida')) {
            return;
        }
        this.input.checked = valor;
        this.#atualizaAtributos(true);
    }
}

document.querySelectorAll('input[name=pista]').forEach(input => {
    new Pista(input);
});

export function autoExibirTodos(valor) {
    instancias.forEach(i => {
        i.setExibido(valor);
    });
}