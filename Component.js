/*global jQuery, sap */
sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/model/resource/ResourceModel",
  "sap/ui/demo/tracker/model/IssueModel",
  "sap/ui/demo/tracker/util/Utility"],
  function (UIComponent, ResourceModel, IssueModel, Utility) {
    "use strict";

    var component = UIComponent.extend("sap.ui.demo.tracker.Component", {
      metadata: {
        manifest: "json"
      },

      init: function() {
        var mConfig, sServiceUrl;

        UIComponent.prototype.init.apply(this, arguments);

        mConfig = this.getMetadata()
                      .getConfig();

        this.setI18nModel(mConfig.resourceBundle);

        sServiceUrl = mConfig.issuesServiceUri;

        if (this.useMockData()) {
          this.startMockServer(sServiceUrl);
        }

        this.setModel(new IssueModel(sServiceUrl, true));

        this.getRouter().initialize();
      },
      setI18nModel: function (resourceBundle) {
        // always use absolute paths relative to our own component
        // (relative paths will fail if running in the Fiori Launchpad)
        var rootPath = jQuery.sap.getModulePath("sap.ui.demo.tracker"),
            i18nModel = new ResourceModel({
              bundleUrl: [rootPath, resourceBundle].join("/")
            });

        this.setModel(i18nModel, "i18n");
      },
      useMockData: function () {
        return jQuery.sap.getUriParameters().get("responderOn") === "true";
      },
      startMockServer: function (serviceUrl) {
        var mockServer;

        jQuery.sap.require("sap.ui.app.MockServer");
        mockServer = new sap.ui.app.MockServer({
          rootUri: serviceUrl
        });

        mockServer.simulate("model/metadata.xml", "model/");
        mockServer.start();

        Utility.displayMessageToast("Running in demo mode with mock data.");

      }
    });

    return component;
  });
