sap.ui.define([
    "sap/ui/core/library"
], function(coreLibrary) {
    "use strict";

   

    const stringVazia = "";
    const ValueStateErro = coreLibrary.ValueState.Error;
    const ValueStatePadrao = coreLibrary.ValueState.None;
   
    return {
         i18n : null,
         setI18Nmodel :function(_i18n){
            this.i18n=_i18n;
            },

        validarMarca: function(inputMarca) {

            if (inputMarca.getValue() == stringVazia) {
                inputMarca.setValueState(ValueStateErro);
                inputMarca.setValueStateText(mensagemDeErroDosCampos);
                return false;
            } else {
                inputMarca.setValueState(ValueStatePadrao);
                return true;
            }
        },

        validarModelo: function(inputModelo) {

            if (inputModelo.getValue() == stringVazia) {
                inputModelo.setValueState(ValueStateErro);
                inputModelo.setValueStateText(mensagemDeErroDosCampos);
                return false;
            } else {
                inputModelo.setValueState(ValueStatePadrao);
                return true;
            }
        },

        validarCor: function(inputCor) {

            if (inputCor.getValue() == stringVazia) {
                inputCor.setValueState(ValueStateErro);
                inputCor.setValueStateText(mensagemDeErroDosCampos);
                return false;
            } else {
                inputCor.setValueState(ValueStatePadrao);
                return true;
            }
        },

        validarMemoria: function(inputMemoria) {

            if (inputMemoria.getValue() == stringVazia) {
                inputMemoria.setValueState(ValueStateErro);
                inputMemoria.setValueStateText(mensagemDeErroDosCampos);
                return false;
            } else {
                inputMemoria.setValueState(ValueStatePadrao);
                return true;
            }
        },

        validarData: function(inputAnoFabricado) {

            if (inputAnoFabricado.getValue() == stringVazia) {
                inputAnoFabricado.setValueState(ValueStateErro);
                inputAnoFabricado.setValueStateText(mensagemDeErroDosCampos);
                return false;
            } else {
                inputAnoFabricado.setValueState(ValueStatePadrao);
                return true;
            }
        },

        ehCamposValidos: function(aoClicarEmSalvar) {
            let resultadoValidacaoMarca =  this.validarMarca(aoClicarEmSalvar.marca)
            let resultadoValidacaoModelo = this.validarModelo(aoClicarEmSalvar.modelo)
            let resultadoValidacaoCor = this.validarCor(aoClicarEmSalvar.cor)
            let resultadoValidarMemoria = this.validarMemoria(aoClicarEmSalvar.memoria)
            let resiçtadoValidarAnoFabricado = this.validarData(aoClicarEmSalvar.anoFabricado)

           return resultadoValidacaoMarca
           &&resultadoValidacaoModelo
           &&resultadoValidacaoCor
           &&resultadoValidarMemoria
           &&resiçtadoValidarAnoFabricado
        },
        
        mensagemDeErroDosCampos : function (){            
            
       this.i18n.getText("ValidacaoMarca");
       this.i18n.getText("ValidacaoModelo");
       this.i18n.getText("ValidacaoCor");
       this.i18n.getText("ValidacaoMemoria");
       this.i18n.getText("ValidacaoAnoFabricacao");        

        }
    };
});
