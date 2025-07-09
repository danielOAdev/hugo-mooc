/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2025 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  'use strict'

  /**
   * Retorna a preferência de tema em Local Storage.
   * @returns auto, light, dark ou highcontrast
   */
  const getStoredTheme = () => localStorage.getItem('theme')

  /**
   * Armazena preferência de tema em Local Storage.
   * @param {*} theme
   * @returns void
   */
  const setStoredTheme = theme => localStorage.setItem('theme', theme)

  /**
   * Remove preferência de tema em Local Storage.
   * @returns 
   */
  const removeStoredTheme = () => localStorage.removeItem('theme');

  /**
   * Retorna a preferência de tema do usuário.
   * @returns auto, light, dark ou highcontrast
   */
  const getTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme && storedTheme !== 'auto') {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  /**
   * Altera o atributo "data-bs-theme" do elemento <html>.
   * @param {*} theme light, dark ou highcontrast
   */
  const setTheme = theme => {
    if (theme === 'auto') {
      document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  /**
   * Marca o botão de radio correspondente.
   * @param {*} theme auto, light, dark ou highcontrast
   * @returns void
   */
  const showActiveTheme = (theme) => {
    const radioToCheck = document.querySelector(`input[name="theme"][value="${theme}"]`)

    if (!radioToCheck) {
      return
    }

    radioToCheck.checked = true;
  }

  setTheme(getTheme())

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (!storedTheme || storedTheme === 'auto' ) {
      setTheme('auto')
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getStoredTheme())

    document.querySelectorAll('input[name="theme"]')
      .forEach(radio => {
        radio.addEventListener('change', () => {
          const theme = radio.value
          setStoredTheme(theme)
          setTheme(theme)
        })
      })

    document.querySelector('#form-a11y button[type="reset"]')
      .addEventListener('click', () => {
        removeStoredTheme()
        setTheme('auto')
      })
  })
})()