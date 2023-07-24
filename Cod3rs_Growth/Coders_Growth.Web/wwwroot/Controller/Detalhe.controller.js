sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/m/MessageToast","sap/m/library",

	

], function (Controller, JSONModel,MessageBox, MessageToast, mobileLibrary) {	
	"use strict";
	const uri="https://localhost:59606/api/celular/";
	const caminhoControllerDetalhe="sap.ui.demo.viniCelulares.controller.Detalhe";
	const lista="listaDeCelulares";
	const rotaCadastroDeCelular = "edicaoDeCelular"
	var ButtonType = mobileLibrary.ButtonType;
	var DialogType = mobileLibrary.DialogType;
	
	return Controller.extend(caminhoControllerDetalhe, {	
		_id: null,
		i18n : null,
        setI18Nmodel :function(_i18n){
            this.i18n=_i18n;
        },
		
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
			
			const mensagemAviso = "Cê sabe que vai apaga né? Se cê apagar apagô!";
			const mensagemErro="O celular selecionado não existe";
			const mensagemApagado="O celular foi removido com sucesso!";
			const celular = this.getView().getModel('celular').getData();
			const id = celular.id;

				if(id){debugger
					MessageBox.warning(mensagemAviso,
					{
						emphasizedAction: MessageBox.Action.YES,
						initialFocus: MessageBox.Action.NO,
						actions: [MessageBox.Action.YES, MessageBox.Action.NO],
						onClose:(acao) => {
							debugger
							
							if(acao == MessageBox.Action.YES){
							this._removerCelular();
							MessageToast.show(mensagemApagado);
							this._navegar()
							}
							else{
								MessageToast.show(mensagemErro);
							}
						},
					});
				}			
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
