sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",

], function (
    Controller,
    MessageBox,
) {
    const mensagemAviso = I18n.getText("MensagemAviso");
    const mensagemApagado = I18n.getText("MensagemApagado");
    const mensagemCancelado = I18n.getText("MensagemCancelado")
    "use strict";

    return Controller.extend("sap.ui.demo.viniCelulares.services.Mensagens", {

        confirmar: function (mensagemAviso, funcao, id) {
            return MessageBox.confirm(mensagemAviso, {
                actions: [MessageBox.Action.YES, MessageBox.Action.CANCEL],
                onClose: (acao) => {
                    if (acao === MessageBox.Action.YES) {
                        return funcao.apply(this, id)
                        
                    }
                    return
                }
            })
        },
        Erro: function (texto) {
            MessageBox.error(texto);
        },
        sucesso: function (texto) {
            MessageBox.success(texto)
        }
    });
});