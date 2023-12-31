sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../services/Validacao",
	"../model/Formatter",
	"../services/RepositorioCelular",
	"../services/Mensagens",

], function (Controller, JSONModel, Validacao, Formatter, RepositorioCelular ,Mensagens ) {	
	"use strict";

	const caminhoControllerCadastroDeCelular="sap.ui.demo.viniCelulares.controller.CadastroDeCelular";
	const lista="listaDeCelulares";
	const modeloCelular = "celulares";
	const inputMarca= "marca";
	const inputModelo ="modelo";
	const inputCor ="cor";
	const inputMemoria ="memoria";
	const inputAnoFabricado ="dataDeFabricacao";
	const rotaCadastroDeCelular = "cadastroDeCelular";
	const rotaEditarCelular = "edicaoDeCelular";
	const rotaDetalhe = "detalhe";
	const valorPadrao = "";

	return Controller.extend(caminhoControllerCadastroDeCelular, {	
		
		I18n: null,

		onInit : function() 
		{
			const modelI18n = "i18n"
			this._I18n = this.getOwnerComponent().getModel(modelI18n).getResourceBundle()
			
			const I18n = this.getOwnerComponent().getModel(modelI18n).getResourceBundle();
			Validacao.setI18Nmodel(I18n);

			let oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute(rotaCadastroDeCelular).attachPatternMatched(this._aoCoincidirRota, this);
			oRouter.getRoute(rotaEditarCelular).attachPatternMatched(this._aoCoincidirRotaEditar, this);
		},

		_aoCoincidirRota: function()
		{
			this._processarEvento(() =>
			{
				this._setarModeloCelular();
			})
		},
		
		_aoCoincidirRotaEditar: function(oEvent)
		{
			const argumentos = "arguments";
			this._processarEvento(() => 
			{
				this._modeloCelulares();
				let id = oEvent.getParameter(argumentos).id
				this._carregarCelular(id)
			})
		},

		_setarModeloCelular: function()
		{	
			let celular= this._retornarObjetoCelular()
			this.getView().setModel(new JSONModel(celular),modeloCelular);
		},
		
		_retornarObjetoCelular: function() {
			return {
				id: 0,
				marca: valorPadrao,
				modelo: valorPadrao,
				cor: valorPadrao,
				memoria: valorPadrao,
				anoFabricado: valorPadrao
			};
		},

		_carregarCelular: function (idCelular)
		{
			RepositorioCelular.ObterPorId(idCelular)
			.then((response)=> response.json())
			.then(json =>{
				var oModel = new JSONModel(json);
				this.getView().setModel(oModel, modeloCelular)
			})
		},

		aoClicarEmSalvar: function()
		{	  
			this._processarEvento(() => {
				const mensagemDeFalhaAoCadastrar = "ValidacaoDeFalha";

				let marca = this.getView().byId(inputMarca)
				let modelo = this.getView().byId(inputModelo)
				let cor =  this.getView().byId(inputCor)
				let memoria = this.getView().byId(inputMemoria)
				let anoFabricado = this.getView().byId(inputAnoFabricado)
							
				let objetoCamposAValidar = {
					marca,
					modelo,
					cor,
					memoria,
					anoFabricado
				}
				
				if (Validacao.ehCamposValidos(objetoCamposAValidar))
				{
					let celular = this._modeloCelulares().getData();

					if(celular.id){
						this._editarCelular(celular)
					}
					else{
						this._salvarCelular(celular)
					}
				}	
				else{
					Mensagens.aviso(this._I18n.getText(mensagemDeFalhaAoCadastrar));
				}
			});
		},
		
		_modeloCelulares: function(modelo){
			const nomeModelo = "celulares";
			if (modelo){
				return this.getView().setModel(modelo, nomeModelo);
			} 
			else{
				return this.getView().getModel(nomeModelo);
			}
		},
				
		aoClicarEmCancelar: function () {
			this._processarEvento(() => {
				this._navegar(lista);
			})
		},

		_salvarCelular:  function(celular)
		{		
			RepositorioCelular.Adicionar(celular)
			.then((response)=> response.json())
			.then(novoCelular =>{				
				this._navegar(rotaDetalhe, novoCelular.id)
			})
		},

		_editarCelular:function(celular)
		{
			RepositorioCelular.Editar(celular)
				.then(response => response.json())
				.then(celularEditado =>{				
					this._navegar(rotaDetalhe, celularEditado.id)
				})
		},

		_navegar: function(lista, id){
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(lista, {id});
        },
    
        aoClicarEmVoltar: function () {
            this._processarEvento(() => 
			{
				this._navegar(lista);
			})
		},
		
		aoInserirCor: function() {
			let cor = this.getView().byId(inputCor)
			Formatter.formatarCor(cor)
		},

		aoInserirMemoria: function() {
			let memoria = this.getView().byId(inputMemoria)
			Formatter.formatarMemoria(memoria)
		},

		setarValorDoInput: function() {
			let campos = ["marca","modelo","cor","memoria","anoFabricado"]

			campos.forEach(res => {
				campoDefinido = this.getView().byId(res)
				campoDefinido.setValueState(valorPadrao)
				campoDefinido.setValue(valorPadrao)
			})
		},

		_processarEvento: function(action){
			const tipoDaPromise = "catch"
			const tipoBuscado = "function"
			
			try {
				var promise = action();
				if(promise && typeof(promise[tipoDaPromise]) == tipoBuscado){
					promise.catch(error =>  RepositorioCelular.aviso(error.message));
				}
			} catch (error) {
				RepositorioCelular.aviso(error.message);
			}
	}
    });
});