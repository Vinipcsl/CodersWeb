sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {	
	"use strict";
	const uri="https://localhost:59606/api/celular/";
	const caminhoControllerCadastroDeCelular="sap.ui.demo.viniCelulares.controller.CadastroDeCelular";
	const lista="listaDeCelulares";
	const modeloCelular = "celulares";
	

	return Controller.extend(caminhoControllerCadastroDeCelular, {	

		onInit : function() {
			let oRouter = this.getOwnerComponent().getRouter();
			oRouter.attachRoutePatternMatched(this._aoCoincidirRota, this);
		},

		_aoCoincidirRota: function()
		{
			this.setarModeloCelular();
		},
		setarModeloCelular: function()
		{
			const stringVazia = "";
			let celular= {
				marca: stringVazia,
				modelo:stringVazia,
				cor: stringVazia,
				memoria: stringVazia,
				anoFabricado: stringVazia
			}
			this.getView().setModel(new JSONModel(celular),modeloCelular);
		},
		aoClicarEmSalvar: function()
		{
			const celular = this.getView()
			.getModel(modeloCelular)
			.getData();
			this._salvarCelular(celular);
		},
		_salvarCelular: function(celular)
		{
			rotaDetalhe = "detalhe";
			fetch(uri,{
				method:"POST",
				headers:{
					"Content-Type": "application/json",
				},
				body:JSON.stringify(celular)
			})
			.then((response)=> response.json())
			.then(anoFabricado => this._navegar(rotaDetalhe))
		},

		_navegar: function(lista){
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(lista);
        },
    
        aoClicarEmVoltar: function () {
			let oRouter = this.getOwnerComponent().getRouter();
            this._navegar(lista);
		},
    
        });
    });