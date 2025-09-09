import { Toast } from "../bootstrap/bootstrap.min.mjs";

document.addEventListener('click', (event) => {
    if (!event.target.matches('h3[id]')) return;

    document.querySelectorAll('h3[id].copiado').forEach(element => {
        element.classList.remove('copiado');
    });
    event.target.classList.add('copiado');
    console.log('Link copiado');
    setTimeout(function() {
        event.target.classList.remove('copiado');
    }, 2000);
});