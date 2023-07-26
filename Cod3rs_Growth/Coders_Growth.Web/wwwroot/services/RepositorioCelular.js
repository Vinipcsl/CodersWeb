sap.ui.define([

],function(){
    "use strict";
    const rotaDetalhe = "detalhe";
    const uri="https://localhost:59606/api/celular/";
    return{
        
        ObterTodos :  function()
        {
            return fetch(uri);
        },

        ObterPorId: async function(id) 
        {
            let response = await(fetch(`${uri}${id}`));
            return response.status !== 500
            ? response.json()
            :response.status;
        },

        Adicionar: function(celular)
        {
            return fetch(uri,{
				method:"POST",
				mode: "cors",
				headers:{
					"Content-Type": "application/json",
				},
				body:JSON.stringify(celular)
			});
        },

        Editar: function(celular)
        {
            debugger
             return fetch(`${uri}${celular.id}`, {
                method:'PUT',
                header: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(celular)
            })
        },

        Remover: async function() 
        {
            return fetch (`${uri}${id}`, {
				method:'DELETE',
				headers:{'Content-Type':'application/json'},
			})
        },
    }
})