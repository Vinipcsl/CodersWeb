sap.ui.define([
	"sap/ui/core/UIComponent"
], function (UIComponent) {
	return UIComponent.extend("ViniCelulares.Component", {
		
		metadata: {
			interfaces: ["sap.ui.core.IAsyncContentCreation"],
			manifest: "json"
		},

		init: function () {
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
		}
	});
});