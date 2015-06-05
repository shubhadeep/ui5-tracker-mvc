/*global window sap */
sap.ui.define(
  ["sap/ui/core/mvc/Controller",
   "sap/m/MessageBox",
   "sap/m/MessageToast",
   "sap/ui/core/UIComponent"],
  function (Controller, MessageBox, MessageToast, UIComponent) {
    "use strict";

    var controller = Controller.extend("sap.ui.demo.tracker.base.Controller", {
      getRouter: function () {
        return  UIComponent.getRouterFor(this);
      },
      displayValidationErrors: function () {
        MessageBox.show("Validation Error", {
          title: "Invalid Inputs"
        });
      },
      showMessageToast: function (message) {
        window.setTimeout(function () {
            MessageToast.show(message);
          }, 0);
      },
      showBackendError: function (error) {
        MessageBox.show(
          error.responseText, {
            icon: MessageBox.Icon.ERROR,
            title: error.message,
            actions: [MessageBox.Action.OK]
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
