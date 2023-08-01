sap.ui.define([

],function(){
    "use strict";
    const uri="https://localhost:59606/api/celular/";
    return{
        
        ObterTodos :  function()
        {
            return fetch(uri);
        },

        ObterPorId: async function(id) 
        {
            return fetch(`${uri}${id}`);
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
             return fetch(`${uri}${celular.id}`, {
                method:'PUT',
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: corpo
            })
        },

        Excluir: function(id) 
        {
            return fetch (`${uri}${id}`, {
				method:'DELETE',
				headers:{'Content-Type':'application/json'},
			})
        },
    }
})