sap.ui.define([
    "sap/ui/core/library"
    ],function (coreLibrary) {
        "use strict";
       
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
            if(cor == stringVazia){            
                    inpoutCor.setValueState(ValueStateErro);
                    inpoutCor.setValueStateText("Por gentileza, preencha corretamente o campo cor♥")
                    return false;
        }
        else{
            inpoutCor.setValueState(ValueStatePadrao);
            return true;}
            },
        validarMemoria: function(inpoutMemoria){
            
            let memoria = inpoutMemoria.getValue()
            if(memoria == stringVazia){
                inpoutMemoria.setValueState(ValueStateErro);
                inpoutMemoria.setValueStateText("Por gentileza, preencha corretamento o campo memoria♥")
                return false;
            }
            else{
                inpoutMemoria.setValueState(ValueStatePadrao);
                return true;
            }
        },
        validarData: function(inputAnoFabricado){
            let anoFabricado = inputAnoFabricado.getValue()
            
            if( anoFabricado == stringVazia){
                inputAnoFabricado.setValueState(ValueStateErro);
                inputAnoFabricado.setValueStateText("Por gentileza, selecione uma data válida♥")
                return false;
            }
            else{
                inputAnoFabricado.setValueState(ValueStatePadrao);
                return true;
            }
        }
    }
});