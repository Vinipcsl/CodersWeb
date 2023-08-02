sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../services/Validacao",
	"../model/Formatter",
	"../services/RepositorioCelular",
	"../services/Mensagens",
	"sap/ui/model/resource/ResourceModel"


], function (Controller, JSONModel, Validacao, Formatter, RepositorioCelular ,Mensagens, ResourceModel) {	
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

		onInit : function() 
		{
			const I18n = "i18n"
			const oBundle = this.getOwnerComponent().getModel(I18n).getResourceBundle();
			Validacao.setI18Nmodel(oBundle);

			let oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute(rotaCadastroDeCelular).attachPatternMatched(this._aoCoincidirRota, this);
			oRouter.getRoute(rotaEditarCelular).attachPatternMatched(this._aoCoincidirRotaEditar, this);
		},

		_aoCoincidirRota: function()
		{
			this._setarModeloCelular();
		},
		
		_aoCoincidirRotaEditar: function(oEvent)
		{
			this._modeloCelulares();
			let id = oEvent.getParameter("arguments").id
			this._carregarCelular(id)
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

		_carregarCelular: async function (idCelular)
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
					Mensagens.falhou(this.mensagemI18n(mensagemDeFalhaAoCadastrar));
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

		_salvarCelular: async function(celular)
		{		
			const sucesso = "SucessoAoCadastrar"	
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
            this._processarEvento(() => {
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

		mensagemI18n: function (texto) {
            const i18n = new ResourceModel({
                bundleName: "sap.ui.demo.viniCelulares.i18n.i18n",
                bundleUrl: "../i18n/i18n.properties"
            }).getResourceBundle();

            return i18n.getText(texto);
        },

		_processarEvento: function(action){
			const tipoDaPromise = "catch"
			const tipoBuscado = "function"
			
			try {
				var promise = action();
				if(promise && typeof(promise[tipoDaPromise]) == tipoBuscado){
					promise.catch(error => MessageBox.error(error.message));
				}
			} catch (error) {
				MessageBox.error(error.message);
			}
	}
    });
});