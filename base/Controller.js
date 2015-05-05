/*global window sap jQuery */
jQuery.sap.declare("sap.ui.demo.tracker.base.Controller");

sap.ui.core.mvc.Controller.extend("sap.ui.demo.tracker.base.Controller", {
  getRouter: function () {
    "use strict";

    return  sap.ui.core.UIComponent.getRouterFor(this);
  },
  displayValidationErrors: function (errors) {
    "use strict";

    jQuery.sap.require("sap.m.MessageBox");
    sap.m.MessageBox.show("Validation Error", {
      title: "Invalid Inputs"
    });
  },
  showMessageToast: function (message) {
    "use strict";

    window.setTimeout(function () {
        sap.m.MessageToast.show(message);
      }, 0);
  },
  showBackendError: function (error) {
    "use strict";

    jQuery.sap.require("sap.m.MessageBox");
    sap.m.MessageBox.show(
      error.responseText, {
        icon: sap.m.MessageBox.Icon.ERROR,
        title: error.message,
        actions: [sap.m.MessageBox.Action.OK]
      }
    );
  },
  getI18nText: function (key) {
    "use strict";

    return this.getOwnerComponent()
               .getModel("i18n")
               .getResourceBundle()
               .getText(key);
  }
});
