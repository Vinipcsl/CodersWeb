sap.ui.define([
    "sap/ui/core/mvc/Controller"
 ], function (Controller) {
    "use strict";
    return Controller.extend("sap.ui.demo.celular.controller.App", {
       onShowHello : function () {
          // show a native JavaScript alert
          alert("Bora Cadastrar");
       }
    });
 });