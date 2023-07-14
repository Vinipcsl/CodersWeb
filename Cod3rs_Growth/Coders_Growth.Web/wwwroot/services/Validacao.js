sap.ui.define([
    "sap/ui/core/library"
], function(coreLibrary) {
    "use strict";

    const stringVazia = "";
    const ValueStateErro = coreLibrary.ValueState.Error;
    const ValueStatePadrao = coreLibrary.ValueState.None;

    const inputMarca = "marca";
    const inputModelo = "modelo";
    const inputCor = "cor";
    const inputMemoria = "memoria";
    const inputAnoFabricado = "dataDeFabricacao";

    return {
        
        validarMarca: function(inputMarca) {
            var i18nModel = new ResourceModel({
                bundleName: "viniCelulares.i18n.i18n",
                bundleUrl: "../i18n/i18n.properties"
            });
            const mensagemFalhaValidacao = i18n.getText("mensagemDoi18n");

            if (inputMarca.getValue() == stringVazia) {
                inputMarca.setValueState(ValueStateErro);
                inputMarca.setValueStateText("Por gentileza, preencha o campo marca ♥");
                return false;
            } else {
                inputMarca.setValueState(ValueStatePadrao);
                return true;
            }
        },

        validarModelo: function(inputModelo) {
            var i18nModel = new ResourceModel({
                bundleName: "viniCelulares.i18n.i18n",
                bundleUrl: "../i18n/i18n.properties"
            });

            if (inputModelo.getValue() == stringVazia) {
                inputModelo.setValueState(ValueStateErro);
                inputModelo.setValueStateText("Por gentileza, preencha o campo modelo♥");
                return false;
            } else {
                inputModelo.setValueState(ValueStatePadrao);
                return true;
            }
        },

        validarCor: function(inputCor) {
            var i18nModel = new ResourceModel({
                bundleName: "viniCelulares.i18n.i18n",
                bundleUrl: "../i18n/i18n.properties"
            });

            if (inputCor.getValue() == stringVazia) {
                inputCor.setValueState(ValueStateErro);
                inputCor.setValueStateText("Por gentileza, preencha corretamente o campo cor♥");
                return false;
            } else {
                inputCor.setValueState(ValueStatePadrao);
                return true;
            }
        },

        validarMemoria: function(inputMemoria) {
            var i18nModel = new ResourceModel({
                bundleName: "viniCelulares.i18n.i18n",
                bundleUrl: "../i18n/i18n.properties"
            });

            if (inputMemoria.getValue() == stringVazia) {
                inputMemoria.setValueState(ValueStateErro);
                inputMemoria.setValueStateText("Por gentileza, preencha corretamento o campo memoria♥");
                return false;
            } else {
                inputMemoria.setValueState(ValueStatePadrao);
                return true;
            }
        },

        validarData: function(inputAnoFabricado) {
            var i18nModel = new ResourceModel({
                bundleName: "viniCelulares.i18n.i18n",
                bundleUrl: "../i18n/i18n.properties"
            });

            if (inputAnoFabricado.getValue() == stringVazia) {
                inputAnoFabricado.setValueState(ValueStateErro);
                inputAnoFabricado.setValueStateText("Por gentileza, selecione uma data válida♥");
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
        }
    };
});
