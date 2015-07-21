/*global jQuery sap */
sap.ui.define(
  ["sap/ui/core/mvc/Controller",
   "sap/m/MessageBox",
   "sap/m/MessageToast",
   "sap/ui/core/UIComponent",
   "sap/ui/demo/tracker/model/Formatter"],
  function (Controller, MessageBox, MessageToast, UIComponent, Formatters) {
    "use strict";

    var controller = Controller.extend("sap.ui.demo.tracker.base.Controller", {
      getRouter: function () {
        return  UIComponent.getRouterFor(this);
      },
      formatters: Formatters,
      displayValidationErrors: function () {
        var message = this.getI18nText("GENERIC_VALIDATION_ERROR_MESSAGE"),
            title = this.getI18nText("GENERIC_VALIDATION_ERROR_TITLE");

        MessageBox.show(message, {
          title: title
        });
      },
      showMessageToast: function (message) {
        jQuery.sap.delayedCall(0, function () {
            MessageToast.show(message);
          });
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
