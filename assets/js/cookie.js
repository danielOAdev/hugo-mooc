(function () {
  const emProducao = window.location.hostname === 'mooc.campusvirtual.fiocruz.br';

   function criaCookie() {
    document.cookie = 
    `theme=light; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=${window.location.pathname}`

    let expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 dias em milissegundos

    let expiresUTCString = "expires=" + expirationDate.toUTCString();

    const cookie = new Cookie;

    cookie.name = '';
    cookie.value = '';
    cookie.expires = '';
    cookie.path = '';

    Object.values(user).join(", ");
  };

  class GerenciadorDeCookies {

    criarCookie(nome, valor, diasDeVida = 30) {
      const dataDeExpiracao = this.#calculaDataDeExpiracao();
      const path = this.#getPath();
      document.cookie = `${nome}=${valor}; expires=${dataDeExpiracao(diasDeVida)}; path=${path}`
    }

    isProducao() {
      return window.location.hostname === 'mooc.campusvirtual.fiocruz.br';
    }

    #getPath() {
      if (this.isProducao) {
        let path = window.location.pathname.match(/\/rea\/.*?\//)[0] ?? '/'
        if (path) {
          return path[0];
        }
      }
      return '/';
    }

    #calculaDataDeExpiracao(diasDeVida) {
      const dataDeExpiracao = new Date();
      dataDeExpiracao.setTime(dataDeExpiracao.getTime() + (diasDeVida * 24 * 60 * 60 * 1000)); // 30 dias em milissegundos
      return dataDeExpiracao.toUTCString();
    }

    #getValorDoCookie(nome) {
      return document.cookie
        .split("; ")
          .find((row) => row.startsWith(`${nome}=`))
          ?.split("=")[1];
    }

    preferenciasParaJson() {
      preferencias = {
        tema: 1,
        tamanhoDoTexto: 1
      }
      JSON.stringify()
    }
  }
})();