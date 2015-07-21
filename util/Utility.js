/*global jQuery sap */
sap.ui.define([
  "sap/m/MessageToast"],
  function (MessageToast) {
    "use strict";

    return {
      displayMessageToast: function (message) {
        jQuery.sap.delayedCall(0, this, function () {
            MessageToast.show(message);
          }
        );
      }

    };

  }, true /*export*/);
