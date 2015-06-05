/*global window sap */
sap.ui.define([
  "sap/m/MessageToast"], 
  function (MessageToast) {
    "use strict";

    return {
      displayMessageToast: function (message) {
        window.setTimeout(function () {
          MessageToast.show(message);
        }, 0);
      }
    };
  }, true /*export*/);
