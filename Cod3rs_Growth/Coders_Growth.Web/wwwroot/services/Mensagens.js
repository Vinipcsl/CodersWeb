sap.ui.define([
    "sap/m/MessageBox",

], function (MessageBox,) 
{
    "use strict";

    return {

        confirmar: function (mensagemAviso, mensagemCancelado, functionRemover, id) {
            return MessageBox.confirm(mensagemAviso, {
                actions: [MessageBox.Action.YES, MessageBox.Action.CANCEL],
                onClose: (acao) => {
                    if (acao === MessageBox.Action.YES) {
                        return functionRemover.apply(this, id);
                    }
                    
                    return MessageBox.error(mensagemCancelado);
                }
            })
        },

        falhou: function (mensagem) {
           return MessageBox.error(mensagem, {
            actions:[MessageBox.Action.OK]
           });
        },
        
        aviso: function (MensagemApagado) {
          return MessageBox.alert(MensagemApagado,{
            actions:[MessageBox.Action.OK]
          })
        }
    };
});