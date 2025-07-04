/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2025 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  'use strict'

  /**
   * Retorna a preferência de tamanho do texto em Local Storage.
   * @returns 1, 1.25, 1.5
   */
  const getStoredFontScale = () => localStorage.getItem('font-scale')

  /**
   * Armazena preferência de tamanho do texto em Local Storage.
   * @param {*} fontScale
   * @returns void
   */
  const setStoredFontScale = fontScale => localStorage.setItem('font-scale', fontScale)

  /**
   * Remove preferência de tamanho do texto em Local Storage.
   * @returns 
   */
  const removeStoredFontScale = () => localStorage.removeItem('font-scale');

  /**
   * Retorna a preferência de tamanho do texto do usuário.
   * @returns 1, 1.25, 1.5
   */
  const getPreferredFontScale = () => {
    const storedFontScale = getStoredFontScale()
    if (storedFontScale) {
      return storedFontScale
    } else {
      return '1';
    }
  }

  /**
   * Aplica a escala à propriedade de estilo "font-size" do elemento <html>.
   * @param {*} fontScale light, dark ou highcontrast
   */
  const setFontSize = fontScale => {
      document.documentElement.style.setProperty("font-size", `${fontScale}em`);
  }

  /**
   * Marca o botão de radio correspondente.
   * @param {*} fontScale 1, 1.25, 1.5
   * @returns void
   */
  const showActiveFontScale = (fontScale) => {
    const radioToCheck = document.querySelector(`input[name="font-scale"][value="${fontScale}"]`)

    if (!radioToCheck) {
      const checkedRadio = document.querySelector(`input[name="font-scale"]:checked`)
      if (!checkedRadio) {
        return
      }
      checkedRadio.checked = false
      return
    }

    radioToCheck.checked = true;
  }

  setFontSize(getPreferredFontScale())

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedFontScale = getStoredFontScale()
    if (storedFontScale === 'auto') {
      setFontScale(getPreferredFontScale())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    showActiveFontScale(getPreferredFontScale())

    document.querySelectorAll('input[name="font-scale"]')
      .forEach(radio => {
        radio.addEventListener('change', () => {
          const fontScale = radio.value
          setStoredFontScale(fontScale)
          setFontSize(fontScale)
        })
      })

    document.querySelector('button[form="id-form-a11y"][type="reset"]')
      .addEventListener('click', () => {
        removeStoredFontScale()
        setFontSize('1')
      })
  })
})()