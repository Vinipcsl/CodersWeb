sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {	
	"use strict";
	const uri="https://localhost:59606/api/celular/";
	const rotaDetalhe="sap.ui.demo.viniCelulares.controller.Detalhe";
	const lista="listaDeCelulares";
	

	return Controller.extend(rotaDetalhe, {
		
		onInit: function () {
			const detalhe="detalhe";

			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute(detalhe).attachPatternMatched(this._aoCoincidirRota, this);
		},

		_aoCoincidirRota: function (oEvent) {
            var Id = oEvent.getParameter("arguments").id
            this._detalhes(Id);
		},

		aoClicarEmVoltar: function () {			
			let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(lista, {}, true);
		},

		_detalhes : function (id){
			const celular="celular";

            let tela = this.getView();
            fetch(`${uri}${id}`)
               .then(function(response){
                  return response.json();
               })
               .then(function (data){
                  tela.setModel(new JSONModel(data),celular)
               })
               .catch(function (error){
                  console.error(error);
               }); 			
        },

	});
});