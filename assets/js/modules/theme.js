setTheme(getTheme());
showActiveTheme(getStoredTheme());

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (!storedTheme || storedTheme === 'auto' ) {
        theme.setTheme('auto')
    }
});

document.querySelectorAll('input[name="theme"]').forEach(radio => {
    radio.addEventListener('change', () => {
        const theme = radio.value
        setStoredTheme(theme)
        setTheme(theme)
    })
})

/**
 * Retorna a preferência de tema em Local Storage.
 * @returns {string} auto, light, dark ou highcontrast
*/
export function getStoredTheme() {
    localStorage.getItem('theme');
}

/**
 * Armazena preferência de tema em Local Storage.
 * @param {string} theme auto, light, dark ou highcontrast
*/
export function setStoredTheme(theme) {
    localStorage.setItem('theme', theme);
}

/**
 * Remove preferência de tema em Local Storage.
*/
export function removeStoredTheme() {
    localStorage.removeItem('theme');
}

/**
 * Retorna a preferência de tema do usuário.
 * @returns {string} auto, light, dark ou highcontrast
*/
export function getTheme() {
    const storedTheme = getStoredTheme()
    if (storedTheme && storedTheme !== 'auto') {
        return storedTheme
    }
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Altera o atributo "data-bs-theme" do elemento <html>.
 * @param {string} theme auto, light, dark ou highcontrast
*/
export function setTheme(theme) {
    if (theme === 'auto') {
        document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
    } else {
        document.documentElement.setAttribute('data-bs-theme', theme)
    }
}

/**
 * Marca o botão de radio correspondente.
 * @param {string} theme auto, light, dark ou highcontrast
*/
export function showActiveTheme(theme) {
    const radioToCheck = document.querySelector(`input[name="theme"][value="${theme}"]`)
    
    if (!radioToCheck) {
        return
    }
    
    radioToCheck.checked = true;
}
