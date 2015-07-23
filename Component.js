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

      /**
       * The component is initialized by SAPUI5 automatically during the startup
       * of the app and calls the init method once.
       * In this method, the models and router is initialized.
       * @public
       * @override
       */
      init: function() {
        var mConfig;

        UIComponent.prototype.init.apply(this, arguments);

        mConfig = this.getMetadata()
                      .getConfig();

        this.initializeModels(mConfig.issuesServiceUri, mConfig.resourceBundle);

        this.getRouter().initialize();
      },

      /**
       * Initializes models for the component
       * @private
       * @param {string} serviceUrl - Service URL for domain model
       * @param {string} resourceBundle - Resource bundle path for i18n model
       */
      initializeModels: function (serviceUrl, resourceBundle) {
        this.setI18nModel(resourceBundle);

        if (this.useMockData()) {
          this.startMockServer(serviceUrl);
        }

        this.setModel(new IssueModel(serviceUrl, true));
      },

      /**
       * Sets internationalization (i18n) model based on resource bundle passed
       * @private
       * @param {string} resourceBundle - Path of resource bundle properties file
       **/
      setI18nModel: function (resourceBundle) {
        // always use absolute paths relative to our own component
        // (relative paths will fail if running in the Fiori Launchpad)
        var rootPath = jQuery.sap.getModulePath("sap.ui.demo.tracker"),
            i18nModel = new ResourceModel({
              bundleUrl: [rootPath, resourceBundle].join("/")
            });

        this.setModel(i18nModel, "i18n");
      },

      /**
       * Returns true if Mock server should be used based on URL parameter.
       * @private
       **/
      useMockData: function () {
        return jQuery.sap.getUriParameters().get("responderOn") === "true";
      },

      /**
       * Starts Mock server
       * @private
       * @param {string} serviceUrl - Service URL to be mocked by Mock server.
       **/
      startMockServer: function (serviceUrl) {
        jQuery.sap.require("sap.ui.demo.tracker.test.Server");
        sap.ui.demo.tracker.test.Server.start(serviceUrl);
      }
    });

    return component;
  }
);
