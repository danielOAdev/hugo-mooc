document.addEventListener('click', function(event) {
    const vigiPista = event.target.closest('.vigi-pista');

    if (vigiPista) {
        event.preventDefault();
        vigiPista.classList.add('show');
    }
});
