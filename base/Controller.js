/*global window sap jQuery */
sap.ui.define(
  ['sap/ui/core/mvc/Controller',
   'sap/m/MessageBox'], 
  function (Controller, MessageBox) {
    "use strict";

    var controller = Controller.extend("sap.ui.demo.tracker.base.Controller", {
      getRouter: function () {
        return  sap.ui.core.UIComponent.getRouterFor(this);
      },
      displayValidationErrors: function () {
        MessageBox.show("Validation Error", {
          title: "Invalid Inputs"
        });
      },
      showMessageToast: function (message) {
        window.setTimeout(function () {
            sap.m.MessageToast.show(message);
          }, 0);
      },
      showBackendError: function (error) {
        MessageBox.show(
          error.responseText, {
            icon: sap.m.MessageBox.Icon.ERROR,
            title: error.message,
            actions: [sap.m.MessageBox.Action.OK]
          }
        );
      },
      getI18nText: function (key) {
        return this.getOwnerComponent()
                   .getModel("i18n")
                   .getResourceBundle()
                   .getText(key);
      }
    });

    return controller;
  }, true /*export*/);
