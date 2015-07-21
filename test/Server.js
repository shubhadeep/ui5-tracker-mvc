/*global jQuery sap*/
sap.ui.define([
  "sap/ui/app/MockServer",
  "sap/m/MessageToast"],
  function (MockServer, MessageToast) {
    "use strict";

    return {
      start: function (serviceUrl) {
        var mockServer = new MockServer({
            rootUri: serviceUrl
          }
        );

        mockServer.simulate("test/mockdata/metadata.xml", {
            sMockdataBaseUrl: "test/mockdata/",
            bGenerateMissingMockData: false
          }
        );

        mockServer.start();

        jQuery.sap.delayedCall(0, this, function () {
            MessageToast.show("Running in demo mode with mock data.");
          }
        );
      }
    };
  }, true);
