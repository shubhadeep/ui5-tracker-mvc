/*global window sap */
sap.ui.define([], function () {
  "use strict";

  sap.ui.demo.tracker.util.Utility = {
    displayMessageToast: function (message) {
      window.setTimeout(function () {
        sap.m.MessageToast.show(message);
      }, 0);
    }
  };

}, true /*export*/);
