sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	const caminhoControllerApp="sap.ui.demo.viniCelulares.controller.App";
	return Controller.extend(caminhoControllerApp, {

		onInit: function () {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		}		
	});
});