sap.ui.define([
    "sap/ui/core/library"
    ],function (coreLibrary) {
        "use strict";
        const regexNumero = /^[^\d]+$/;
        const regexLetra = /^[^a-zA-Z]+$/;

        const stringVazia = "";
        const ValueStateErro = coreLibrary.ValueState.Error;
        const ValueStatePadrao = coreLibrary.ValueState.None;
        return{
         validarMarca: function(inpoutMarca) {
            let marca = inpoutMarca.getValue();
            if (marca == stringVazia) {
                inpoutMarca.setValueState(ValueStateErro);
                inpoutMarca.setValueStateText("Por gentileza, preencha o campo marca ♥");
                return false;
            } else {
                inpoutMarca.setValueState(ValueStatePadrao);
                return true;
            }
        },
        validarModelo: function(inpoutModelo) {
            let modelo = inpoutModelo.getValue()
            if(modelo == stringVazia){
                inpoutModelo.setValueState(ValueStateErro);
                inpoutModelo.setValueStateText("Por gentileza, preencha o campo modelo♥")
                return false;
            }
            else{
                inpoutModelo.setValueState(ValueStatePadrao);
                return true;
                }
        },
        validarCor: function(inpoutCor){
            let cor = inpoutCor.getValue()
            if(cor == stringVazia || regexNumero){            
                    inpoutCor.setValueState(ValueStateErro);
                    inpoutCor.setValueStateText("Por gentileza, preencha corretamente o campo cor♥")
                    return false;
        }
        else{
            inpoutCor.setValueState(ValueStatePadrao);
            return true;}
            },
        validarMemoria: function(inpoutMemoria){
            let memoria = parseInt(inpoutMemoria.getValue())
            if(memoria == stringVazia || regexLetra){
                inpoutMemoria.setValueState(ValueStateErro);
                inpoutMemoria.setValueStateText("Por gentileza, preencha corretamento o campo memoria♥")
                return false;
            }
            else{
                inpoutMemoria.setValueState(ValueStatePadrao);
                return true;
            }
        }
    }
});