sap.ui.define([], function () {
	"use strict";
	return {

formatarMemoria : function(memoria){
    let memoriaFormatada = memoria.getValue()
    return memoria.setValue(memoriaFormatada.replaceAll(/[^\d]/g, ""))
  },

formatarCor : function(cor){
    let corFormatado = cor.getValue()
    return cor.setValue(corFormatado.replaceAll(/[^\D]/g, ""))
    }    
  };
});