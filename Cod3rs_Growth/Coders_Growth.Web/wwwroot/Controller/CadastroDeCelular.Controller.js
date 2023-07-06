sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {	
	"use strict";
	const uri="https://localhost:59606/api/celular/";
	const caminhoControllerCadastroDeCelular="sap.ui.demo.viniCelulares.controller.CadastroDeCelular";
	const lista="listaDeCelulares";
	

	return Controller.extend(caminhoControllerCadastroDeCelular, {	
    
        aoClicarEmVoltar: function () {
			this._limparTela()
			let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(lista, {}, true);
		},
    
        });
    });