class Quiz {
    constructor(fieldset) {
        if (!(fieldset instanceof HTMLFieldSetElement)) {
            throw new Error("O elemento deve ser um <fieldset>.");
        }

        if (!fieldset.classList.contains("vigi-quiz")) {
            throw new Error("O <fieldset> deve ter a classe 'vigi-quiz'.");
        }

        this.fieldset = fieldset;
        this.titulo = fieldset.querySelector("legend") || null;

        this.botaoEnviar = this.fieldset.querySelector("button.enviar") || null;
        if (!this.botaoEnviar) {
            throw new Error("Botão de envio para Quiz não encontrado.");
        }

        const tipoInput = this.eMulti() ? "checkbox" : "radio";
        const labelsDeOpcoes = Array.from(fieldset.querySelectorAll(`label.opcao:has(input[type="${tipoInput}"])`));

        this.opcoes = labelsDeOpcoes.map(label => new OpcaoQuiz(label));

        if (!this.opcoes) {
            document.console.warn('Quiz não possui opções.');
        }

        this.botaoEnviar.addEventListener("click", () => {
            this.opcoes.forEach(opcao => {
                if (this.eMulti()) {
                    opcao.aplicarFeedback(this.eMulti());
                } else {
                    if (opcao.eCorreto() || opcao.eMarcado()) {
                        opcao.aplicarFeedback();
                    }
                }
            });
            const todasCorretasMarcadas = this.opcoes.every(opcao =>
                 opcao.eCorreto() === opcao.eMarcado()
            );
            fieldset.dataset.respostaCerta = todasCorretasMarcadas;
        });
    }

    eRespondida() {
        return this.fieldset.dataset.hasOwnProperty('respostaCerta')
    }

    eCorreto() {
        return this.eRespondida() ? Boolean(this.fieldset.dataset.respostaCerta) : null;
    }

    eMulti() {
        return this.fieldset.dataset.hasOwnProperty('multi');
    }

    restaurar() {
        delete this.fieldset.dataset.respostaCerta;
        this.opcoes.forEach(opcao => {
            opcao.reset();
        });
    }
}

class OpcaoQuiz {
    constructor(label) {
        this.input = label.querySelector('input');
        this.label = label

        // Tipo: "radio" ou "checkbox"
        this.tipo = this.input.type;
    }

    aplicarFeedback(eMulti) {
        this.label.classList.remove("btn-secondary");
        if (eMulti) {
            this.label.classList.add(this.eCorreto() === this.eMarcado() ? "btn-success" : "btn-danger");
        } else {
            this.label.classList.add(this.eCorreto() ? "btn-success" : "btn-danger");
        }
    }

    eCorreto() {
        return this.label.classList.contains("correto");
    }

    eMarcado() {
        return this.input.checked;
    }

    restaurar() {
        this.input.checked = false;
        this.label.classList.remove("btn-success", "btn-danger");
        this.label.classList.add("btn-secondary");
    }
}

export const instancias = [];
document.querySelectorAll('fieldset.vigi-quiz').forEach(fieldsetVigiQuiz => {
    instancias.push(new Quiz(fieldsetVigiQuiz));
});

export function instanciaPorFieldset(fieldset) {
    for (let index = 0; index < instancias.length; index++) {
        const quiz = instancias[index];
        if (quiz.fieldset = fieldset) {
            return quiz;
        }
    }
}

export function restaurarTodos() {
    instancias.forEach(quiz => {
        quiz.restaurar();
    });
}