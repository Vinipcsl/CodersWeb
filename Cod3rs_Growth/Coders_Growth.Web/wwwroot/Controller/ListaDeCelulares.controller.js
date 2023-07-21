sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
	
], function(Controller, JSONModel,MessageToast, Filter, FilterOperator) {
	"use strict";

	const uri="https://localhost:59606/api/celular/";
	const caminhoControllerLista = "sap.ui.demo.viniCelulares.controller.ListaDeCelulares";
	const celulares = "celulares";
	const celularesDaLista= "celularesDaLista";
	const items= "items";
	const filtoMarca="marca";
	
	return Controller.extend(caminhoControllerLista, {
		
		onInit:function() {
			const rotaListaDeCelulares = "listaDeCelulares";
			var oRouter = this.getOwnerComponent().getRouter();
			   oRouter.getRoute(rotaListaDeCelulares).attachPatternMatched(this._aoCoincidirRota, this);     
		 },
		_aoCoincidirRota: function()
		{
			
			let tela = this.getView();
			fetch(uri)
			   .then(response => {
				  return response.json();
			   })
			   .then(data => {
				  tela.setModel(new JSONModel(data),celulares);
			   })
			   .catch(function (error){
				  console.error(error);
			   });       
		},
		 
		aoClicarProcurarCelular : function(oEvent){
			const query = "query";
			var sQuery = oEvent.getParameter(query),
				aFilter = [];
				if (sQuery)
				{
					aFilter.push(new Filter(filtoMarca, FilterOperator.Contains, sQuery));
				}
				var oTable = this.byId(celularesDaLista);
				var oBinding = oTable.getBinding(items);
				oBinding.filter(aFilter);			
		},

		aoClicarNaLinha: function (evento) {
			const detalhe= "detalhe";
			let id = evento.getSource().getBindingContext(celulares).getObject().id
   
			let oRouter = this.getOwnerComponent().getRouter()
			oRouter.navTo(detalhe, {id})
		},

		aoClicarAdicionar: function () {
			const adicionar= "adicionarCelular";
			let oRouter = this.getOwnerComponent().getRouter()
			oRouter.navTo("cadastroDeCelular")
			
		}
	});
});