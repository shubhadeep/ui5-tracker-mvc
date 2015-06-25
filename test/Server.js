/*global sap window*/
sap.ui.define([
  "sap/ui/app/MockServer",
  "sap/m/MessageToast"],
  function (MockServer, MessageToast) {
    "use strict";

    return {
      start: function (serviceUrl) {
        var mockServer = new MockServer({
          rootUri: serviceUrl
        });

        mockServer.simulate("test/mockdata/metadata.xml",
          {
            sMockdataBaseUrl: "test/mockdata/",
            bGenerateMissingMockData: false
          });

        mockServer.start();

        window.setTimeout(function () {
          MessageToast.show("Running in demo mode with mock data.");
        }, 0);
      }
    };
  }, true);
