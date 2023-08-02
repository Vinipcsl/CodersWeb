sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"../services/Mensagens",
	"../services/RepositorioCelular",
	"sap/ui/model/resource/ResourceModel",
	
	
], function (Controller, JSONModel,MessageBox, Mensagens, RepositorioCelular, ResourceModel ) {	
	"use strict";
	const uri="https://localhost:59606/api/celular/";
	const caminhoControllerDetalhe="sap.ui.demo.viniCelulares.controller.Detalhe";
	const lista="listaDeCelulares";
	const rotaCadastroDeCelular = "edicaoDeCelular"
	let I18n = null;
	const modelI18n = "i18n";

	return Controller.extend(caminhoControllerDetalhe, {	
		onInit: function () {
			const detalhe="detalhe";
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute(detalhe).attachPatternMatched(this._aoCoincidirRota, this);
			I18n = this.getOwnerComponent().getModel(modelI18n).getResourceBundle();
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
			const mensagemAviso = I18n.getText("MensagemAviso");
			const mensagemCancelado = I18n.getText("MensagemCancelado")
			const celular = this.getView().getModel('celular').getData();
			const id = celular.id;
			
			Mensagens.confirmar(this.mensagemI18n(mensagemAviso), this._removerCelular.bind(this), [id]);
		},

		_removerCelular: function(){
			let celular = this.getView().getModel('celular').getData().id;
			RepositorioCelular.Excluir(celular);
			this._navegar();
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

		mensagemI18n: function (texto) {
            const i18n = new ResourceModel({
                bundleName: "sap.ui.demo.viniCelulares.i18n.i18n",
                bundleUrl: "../i18n/i18n.properties"
            }).getResourceBundle();

            return i18n.getText(texto);
        },
	});
});
