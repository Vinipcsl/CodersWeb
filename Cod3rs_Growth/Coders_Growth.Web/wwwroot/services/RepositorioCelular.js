sap.ui.define([], function () {
    "use strict";
  
    const apiConfig = {
      uri: "https://localhost:59606/api/celular/",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    function request(url, options) {
      return fetch(url, options);
    }
  
    return {
      ObterTodos: function () {
        return request(apiConfig.uri);
      },
  
      ObterPorId:  function (id) {
        return request(`${apiConfig.uri}${id}`);
      },
  
      Adicionar: function (celular) {
        return request(apiConfig.uri, {
          method: "POST",
          mode: "cors",
          headers: apiConfig.headers,
          body: JSON.stringify(celular),
        });
      },
  
      Editar: function (celular) {
        return request(`${apiConfig.uri}${celular.id}`, {
          method: "PUT",
          mode: "cors",
          headers: apiConfig.headers,
          body: JSON.stringify(celular),
        });
      },
  
      Excluir: function (id) {
        return request(`${apiConfig.uri}${id}`, {
          method: "DELETE",
          headers: apiConfig.headers,
        });
      },
    };
  });
  