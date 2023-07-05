sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {	
	"use strict";
	const uri="https://localhost:59606/api/celular/";

	return Controller.extend("sap.ui.demo.viniCelulares.controller.Detalhe", {
		
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("detalhe").attachPatternMatched(this._aoCoincidirRota, this);
		},

		_aoCoincidirRota: function (oEvent) {
            var Id = oEvent.getParameter("arguments").id
            this._detalhes(Id);
		},

		aoClicarEmVoltar: function () {
			let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("listaDeCelular", {}, true);
		},

		_detalhes : function (id){
            let tela = this.getView();
            fetch(`${uri}${id}`)
               .then(function(response){
                  return response.json();
               })
               .then(function (data){
                  tela.setModel(new JSONModel(data),"celular")
               })
               .catch(function (error){
                  console.error(error);
               }); 			
        },

	});
});