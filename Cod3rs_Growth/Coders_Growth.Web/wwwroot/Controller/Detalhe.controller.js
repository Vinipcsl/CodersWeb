sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/library",
	"sap/m/Text"

], function (Controller, JSONModel, Dialog, Button, mobileLibrary, Text) {	
	"use strict";
	const uri="https://localhost:59606/api/celular/";
	const caminhoControllerDetalhe="sap.ui.demo.viniCelulares.controller.Detalhe";
	const lista="listaDeCelulares";
	const rotaCadastroDeCelular = "edicaoDeCelular"
	var ButtonType = mobileLibrary.ButtonType;
	var DialogType = mobileLibrary.DialogType;
	
	return Controller.extend(caminhoControllerDetalhe, {	
		_id: null,
		
		onInit: function () {
			const detalhe="detalhe";
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute(detalhe).attachPatternMatched(this._aoCoincidirRota, this);
		},

		_aoCoincidirRota: function (oEvent) {
			const argumento= "arguments";
            var Id = oEvent.getParameter(argumento).id
			this._id = Id;
            this._detalhes(Id);
		},

		aoClicarEmEditar: function(){
			let oRouter = this.getOwnerComponent().getRouter();
			let id = this._id
			oRouter.navTo(rotaCadastroDeCelular, {id})
		},

		aoClicarEmVoltar: function () {			
			let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(lista, {}, true);
		},

		aoClicarEmRemover: function(){

			if(!this.excluirDialog){debugger
				this.excluirDialog = new Dialog({
				type: DialogType.Message,
				title:"Prenstenção",
				content: new Text({ text: "Cê sabe que vai apaga né? Se cê apagar apagô!"}),
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: "Excluir",
					press: function() {
						debugger
						this._removerCelular();
						this.excluirDialog.close()
						this._navegar();
				}.bind(this)
				}),
				endButton: new Button({
					text: "Cancelar",
					press: function() {
						this.excluirDialog.close()
						}.bind(this)
					})
				});
			}
			this.excluirDialog.open();
		
		},

		_removerCelular: function(){
			const celular = this.getView().getModel('celular').getData();
			const id = celular.id
			fetch (`${uri}${id}`, {
				method:'DELETE',
				headers:{'Content-Type':'application/json'},
			})
		
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
		_navegar: function(){
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(lista);
        },
	});
});