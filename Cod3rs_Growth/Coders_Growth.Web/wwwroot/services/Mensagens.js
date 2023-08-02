sap.ui.define([
    "sap/m/MessageBox",

], function (MessageBox,) 
{
    "use strict";

    return {

        confirmar: function (mensagemAviso, functionRemover, id) {
            debugger
            return MessageBox.confirm(mensagemAviso, {
                actions: [MessageBox.Action.YES, MessageBox.Action.CANCEL],
                onClose: (acao) => {
                    if (acao === MessageBox.Action.YES) {
                        debugger
                        return functionRemover.apply(this, id);
                        
                    }
                    return
                }
            })
        },

        falhou: function (mensagem) {
           return MessageBox.error(mensagem, {
            actions:[MessageBox.Action.OK]
           });
        },
        
        sucessou: function (MensagemApagado) {
          return MessageBox.success(MensagemApagado,{
            actions:[MessageBox.Action.OK]
          })
        }
    };
});