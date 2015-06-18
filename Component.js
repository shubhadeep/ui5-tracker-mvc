/*global jQuery, sap */
sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/model/resource/ResourceModel",
  "sap/ui/demo/tracker/model/IssueModel"],
  function (UIComponent, ResourceModel, IssueModel) {
    "use strict";

    var component = UIComponent.extend("sap.ui.demo.tracker.Component", {
      metadata: {
        manifest: "json"
      },
      init: function() {
        var mConfig;

        UIComponent.prototype.init.apply(this, arguments);

        mConfig = this.getMetadata()
                      .getConfig();

        this.initializeModels(mConfig.issuesServiceUri, mConfig.resourceBundle);

        this.getRouter().initialize();
      },
      initializeModels: function (serviceUrl, resourceBundle) {
        this.setI18nModel(resourceBundle);

        if (this.useMockData()) {
          this.startMockServer(serviceUrl);
        }

        this.setModel(new IssueModel(serviceUrl, true));
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
        jQuery.sap.require("sap.ui.demo.tracker.test.Server");
        sap.ui.demo.tracker.test.Server.start(serviceUrl);
      }
    });

    return component;
  });
