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
        var mConfig,
            sServiceUrl;

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
        jQuery.sap.require("sap.ui.demo.tracker.test.Server");
        sap.ui.demo.tracker.test.Server.start(serviceUrl);
      }
    });

    return component;
  });
