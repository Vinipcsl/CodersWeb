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
	const modelI18n = "i18n";

	return Controller.extend(caminhoControllerDetalhe, {

		I18n: null,

		onInit: function () {
			const detalhe="detalhe";
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute(detalhe).attachPatternMatched(this._aoCoincidirRota, this);
			this.I18n = this.getOwnerComponent().getModel(modelI18n).getResourceBundle()
		},

		_aoCoincidirRota: function (oEvent) {
			this._processarEvento(() => {
				const argumento= "arguments";
				var Id = oEvent.getParameter(argumento).id
				this._id = Id;
				this._detalhes(Id);
			})
		},

		aoClicarEmEditar: function(){
			this._processarEvento(() => {
				let oRouter = this.getOwnerComponent().getRouter();
				let id = this._id
				oRouter.navTo(rotaCadastroDeCelular, {id})
			});
		},

		aoClicarEmVoltar: function () {			
			this._processarEvento(() => {
				let oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo(lista, {}, true);
			});
		},

		aoClicarEmRemover: function(){
			this._processarEvento(() => {
				const mensagemAviso = "MensagemAviso";
				const mensagemCancelado = "MensagemCancelado"
				const celular = this.getView().getModel('celular').getData();
				const id = celular.id;
				Mensagens.confirmar(this.I18n.getText(mensagemAviso), this.I18n.getText(mensagemCancelado) , this._removerCelular.bind(this), [id]);
			})
		},

		_removerCelular: function(){
			let celular = this.getView().getModel('celular').getData().id;
			RepositorioCelular.Excluir(celular);
			this._navegar();
		},

		_detalhes : function (id){
			const celular="celular";
            let tela = this.getView();

            RepositorioCelular.ObterPorId(id)
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

		_processarEvento: function(action){
			const tipoDaPromise = "catch"
			const tipoBuscado = "function"

			try {
				var promise = action();
				if(promise && typeof(promise[tipoDaPromise]) == tipoBuscado){
					promise.catch(error => RepositorioCelular.aviso(error.message));
				}
			} catch (error) {
				RepositorioCelular.aviso(error.message);
			}
		}
	});
});
