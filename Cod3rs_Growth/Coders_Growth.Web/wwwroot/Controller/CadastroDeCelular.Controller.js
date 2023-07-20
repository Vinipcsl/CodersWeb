sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../services/Validacao",
	"../model/Formatter",
	"sap/m/MessageBox"

], function (Controller, JSONModel,Validacao,Formatter,MessageBox) {	
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
	const rotaCadastroDeCelular = "cadastroDeCelular";
	const rotaEditarCelular = "edicaoDeCelular";


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
			this.setarModeloCelular();
		},
		
		_aoCoincidirRotaEditar: function(oEvent)
		{
			this._modeloCelulares();
			let Id = oEvent.getParameter("arguments").id
			this._id = Id
			this._carregarCelular(Id)
			
		},

		setarModeloCelular: function()
		{	

			const stringVazia = "";

			let celular= {
				id: 0,
				marca: stringVazia,
				modelo:stringVazia,
				cor: stringVazia,
				memoria: stringVazia,
				anoFabricado: stringVazia
			}
			this.getView().setModel(new JSONModel(celular),modeloCelular);
		},

		_carregarCelular: function (idCelular)
		{
			fetch(`${uri}${idCelular}`)
               .then(function(response){
                  return response.json();
               })
			   .then(json =>{
				var oModel = new JSONModel(json);
				this.getView().setModel(oModel, modeloCelular)
			   })
		},

		aoClicarEmSalvar: function()
		{			
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
				debugger
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
					const mensagemDeFalhaAoCadastrar = "ValidacaoDeFalha";

				MessageBox.error(Validacao.mensagemDeErroDosCampos(mensagemDeFalhaAoCadastrar));
				}
		},
		
		_modeloCelulares: function(modelo){
				const nomeModelo = "celulares";
				if (modelo){
				return this.getView().setModel(modelo, nomeModelo);
				} else{
				return this.getView().getModel(nomeModelo);
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
			.then(novoCelular =>{				
				this._navegar(rotaDetalhe, novoCelular.id)
			} )
		},

		_editarCelular: function(celular)
		{
			const rotaDetalhe = "detalhe";
			fetch(`${uri}/${celular.id}`, {
				method:"PUT",
				mode: "cors",
				headers:{
					"Content-Type": "application/json",
				},
				body:JSON.stringify(celular)
			})
			.then((response) => response.json())
			.then(celularEditado =>{
				this._navegar(rotaDetalhe, celularEditado.id)
			})
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
		},
		setarValorDoInput: function() {
			const valorPadra = "";
			const stringVazia= "";
			let campos = ["marca","modelo","cor","memoria","anoFabricado"]

			campos.forEach(res => {
				campoDefinido = this.getView().byId(res)
				campoDefinido.setValueState(valorPadra)
				campoDefinido.setValue(stringVazia)
			})
		},

    });
});