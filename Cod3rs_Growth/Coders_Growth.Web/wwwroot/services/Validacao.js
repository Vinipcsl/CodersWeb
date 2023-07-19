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
                const valicacaoMarca = "ValidacaoMarca"
                const mensagemErroMarca = this.mensagemDeErroDosCampos(valicacaoMarca)
                inputMarca.setValueState(ValueStateErro);
                inputMarca.setValueStateText(mensagemErroMarca);
                return false;
            } else {
                inputMarca.setValueState(ValueStatePadrao);
                return true;
            }
        },

        validarModelo: function(inputModelo) {
            if (inputModelo.getValue() == stringVazia) {
                const validacaoModelo = "ValidacaoModelo"
                const mensagemErroModelo = this.mensagemDeErroDosCampos(validacaoModelo)
                inputModelo.setValueState(ValueStateErro);
                inputModelo.setValueStateText(mensagemErroModelo);
                return false;
            } else {
                inputModelo.setValueState(ValueStatePadrao);
                return true;
            }
        },

        validarCor: function(inputCor) {
            if (inputCor.getValue() == stringVazia) {
                const valdacaoCor = "ValidacaoCor"
                const mensagemErroCor = this.mensagemDeErroDosCampos(valdacaoCor)
                inputCor.setValueState(ValueStateErro);
                inputCor.setValueStateText(mensagemErroCor);
                return false;
            } else {
                inputCor.setValueState(ValueStatePadrao);
                return true;
            }
        },

        validarMemoria: function(inputMemoria) {
            if (inputMemoria.getValue() == stringVazia) {
                const validacaoMemoria = "ValidacaoMemoria"
                const mensagemErroMemoria = this.mensagemDeErroDosCampos(validacaoMemoria)
                inputMemoria.setValueState(ValueStateErro);
                inputMemoria.setValueStateText(mensagemErroMemoria);
                return false;
            } else {
                inputMemoria.setValueState(ValueStatePadrao);
                return true;
            }
        },

        validarData: function(inputAnoFabricado) {
            if (inputAnoFabricado.getValue() == stringVazia) {
                const validacaoAnoFabricado ="ValidacaoAnoFabricacao"
                const mensagemErroAnoFabricado = this.mensagemDeErroDosCampos(validacaoAnoFabricado)
                inputAnoFabricado.setValueState(ValueStateErro);
                inputAnoFabricado.setValueStateText(mensagemErroAnoFabricado);
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
            let resultadoValidarAnoFabricado = this.validarData(aoClicarEmSalvar.anoFabricado)

           return resultadoValidacaoMarca
           &&resultadoValidacaoModelo
           &&resultadoValidacaoCor
           &&resultadoValidarMemoria
           &&resultadoValidarAnoFabricado
        },
        
        mensagemDeErroDosCampos : function(chaveMensagem) { 
                 
            return this.i18n.getText(chaveMensagem);

        }      
    };
});
