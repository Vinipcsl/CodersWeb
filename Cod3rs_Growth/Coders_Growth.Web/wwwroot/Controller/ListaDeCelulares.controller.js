sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
], function(Controller, JSONModel,MessageToast) {
	"use strict";

	const uri="https://localhost:59606/api/celular/";

	return Controller.extend("sap.ui.demo.viniCelulares.controller.ListaDeCelulares", {

		onInit:function() {
			let tela = this.getView();
			fetch(uri)
			   .then(response => {
				  return response.json();
			   })
			   .then(data => {
				  tela.setModel(new JSONModel(data),"celulares");
			   })
			   .catch(function (error){
				  console.error(error);
			   });       
		 },
		 onCadastro : function(){
			MessageToast.show("Bora cadastrar um cerura");
		 },
		 onFiltro : function (oEvent) {
			let tela = this.getView();
			   var sQuery = oEvent.getParameter("query");
			fetch(`${uri}?marca=${sQuery}`)
			   .then(function(response){
				  return response.json();
			   })
			   .then(function (data){
				  tela.setModel(new JSONModel(data),"celulares");
			   })
			   .catch(function (error){
				  console.error(error);
			   }); 
			   
		   }
	});
});