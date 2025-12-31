class Quiz {
    constructor(fieldset) {
        if (!(fieldset instanceof HTMLFieldSetElement)) {
            throw new Error('O elemento deve ser um <fieldset>.');
        }

        if (!fieldset.classList.contains("vigi-quiz")) {
            throw new Error('O <fieldset> deve ter a classe "vigi-quiz".');
        }

        this.fieldset = fieldset;
        this.titulo = fieldset.querySelector('legend') || null;

        this.inputConfirmar = this.fieldset.querySelector('.confirmar > input') || null;
        if (!this.inputConfirmar) {
            throw new Error('Botão de envio para Quiz não encontrado.');
        }

        this.botaoTentar = this.fieldset.querySelector('button.tentar') || null;
        if (!this.botaoTentar) {
            throw new Error('Botão "Tentar novamente" para Quiz não encontrado.');
        }

        this.botaoRecomecar = this.fieldset.querySelector('button.recomecar') || null;
        if (!this.botaoRecomecar) {
            throw new Error('Botão "Recomeçar" para Quiz não encontrado.');
        }

        this.inputCorrigir = this.fieldset.querySelector('.corrigir > input') || null;
        if (!this.inputCorrigir) {
            throw new Error('Botão "Mostrar resposta" para Quiz não encontrado.');
        }

        const labelsDeOpcoes = Array.from(fieldset.querySelectorAll('label.opcao:has(input)'));
        this.opcoes = labelsDeOpcoes.map(label => new OpcaoQuiz(label));

        if (!this.opcoes) {
            document.console.warn('Quiz não possui opções.');
        }

        this.botaoTentar.addEventListener('click', () => {
            this.restaurar(false);
        });

        this.botaoRecomecar.addEventListener('click', () => {
            this.restaurar(true);
        });
    }

    eMulti() {
        return this.fieldset.dataset.hasOwnProperty('multi');
    }

    restaurar(opcoes = false) {
        this.inputConfirmar.checked = false;
        this.inputCorrigir.checked = false;
        if (opcoes) {
            this.opcoes.forEach(opcao => {
                opcao.restaurar();
            });
        }
    }
}

class OpcaoQuiz {
    constructor(label) {
        this.input = label.querySelector('input');
        this.label = label

        // Tipo: "radio" ou "checkbox"
        this.tipo = this.input.type;
    }

    eCorreto() {
        return this.label.classList.contains('correto');
    }

    eMarcado() {
        return this.input.checked;
    }

    restaurar() {
        this.input.checked = false;
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