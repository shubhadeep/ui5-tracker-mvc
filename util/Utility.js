/*global window sap jQuery */
jQuery.sap.declare("sap.ui.demo.tracker.util.Utility");

sap.ui.demo.tracker.util.Utility = {
  displayMessageToast: function (message) {
    "use strict";

    window.setTimeout(function () {
      sap.m.MessageToast.show(message);
    }, 0);
  }
};
