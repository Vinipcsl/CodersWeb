sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../services/Validacao",
	"../model/Formatter"
], function (Controller, JSONModel,Validacao,Formatter) {	
	"use strict";
	const uri="https://localhost:59606/api/celular/";
	const caminhoControllerCadastroDeCelular="sap.ui.demo.viniCelulares.controller.CadastroDeCelular";
	const lista="listaDeCelulares";
	const modeloCelular = "celulares";
	const inputMarca= "marca";
	const inputModelo ="modelo";
	const inputCor ="cor";
	const inputMemoria ="memoria";
	const inputAnoFabricado ="dataDeFabricacao";	

	return Controller.extend(caminhoControllerCadastroDeCelular, {	

		onInit : function() 
		{
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
		aoClicarEmSalvar: async function()
		{			
			let marca = this.getView().byId(inputMarca)
			let modelo = this.getView().byId(inputModelo)
			let cor =  this.getView().byId(inputCor)
			let memoria = this.getView().byId(inputMemoria)
			let anoFabricado = this.getView().byId(inputAnoFabricado)
			
			let validarCampos = [marca, modelo, cor, memoria, anoFabricado];

			let objetoCamposAValidar = {
					marca,
					modelo,
					cor,
					memoria,
					anoFabricado
				}
				
				let celularCriacao = this.getView().byId()			
	
				// if (Validacao.ehCamposValidos(validarCampos))
				
				if (Validacao.ehCamposValidos(objetoCamposAValidar))
				{				
					 this._salvarCelular(celularCriacao)
				}			
		},
		aoClicarEmCancelar: function () {
			this._navegar(lista);
		},
		_salvarCelular: function(celular)
		{
			const rotaDetalhe = "detalhe";
			fetch(uri,{
				method:"POST",
				mode: "cors",
				headers:{
					"Content-Type": "application/json",
				},
				body:JSON.stringify(celular)
			})
			.then((response)=> response.json())
			.then(novoCelular => this._navegar(rotaDetalhe, novoCelular.id))
		},

		_navegar: function(lista, id){
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(lista, {id});
        },
    
        aoClicarEmVoltar: function () {
			let oRouter = this.getOwnerComponent().getRouter();
            this._navegar(lista);
		},
		
		aoInserirCor: function() {
			let cor = this.getView().byId(inputCor)
			Formatter.formatarCor(cor)
		},

		aoInserirMemoria: function() {
			let memoria = this.getView().byId(inputMemoria)
			Formatter.formatarMemoria(memoria)
		}    
    });
});