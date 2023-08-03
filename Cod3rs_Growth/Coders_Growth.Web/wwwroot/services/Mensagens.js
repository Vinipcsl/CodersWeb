sap.ui.define([
    "sap/m/MessageBox",

], function (MessageBox,) 
{
    "use strict";

    return {

        confirmar: function (mensagemAviso, mensagemCancelado, functionRemover, idParaRemover) {
            return MessageBox.confirm(mensagemAviso, {
                actions: [MessageBox.Action.YES, MessageBox.Action.CANCEL],
                onClose: (acao) => {
                    if (acao === MessageBox.Action.YES) {
                        return functionRemover.apply(this, idParaRemover);
                    }
                    return MessageBox.error(mensagemCancelado);
                }
            })
        },

        aviso: function (MensagemApagado) {
          return MessageBox.alert(MensagemApagado,{
            actions:[MessageBox.Action.OK]
          })
        }
    };
});