/*global jQuery, sap */
jQuery.sap.declare("sap.ui.demo.tracker.Component");

sap.ui.core.UIComponent.extend("sap.ui.demo.tracker.Component", {
  metadata: {
    name: "Issue Tracker Demo App",
    version: "1.0",
    includes: [],
    dependencies: {
      libs: ["sap.m", "sap.ui.layout"],
      components: []
    },

    rootView: "sap.ui.demo.tracker.view.App",

    config: {
      resourceBundle: "i18n/messageBundle.properties",
      serviceConfig: {
        name: "Northwind",
        serviceUrl: "/uilib-sample/proxy/http/services.odata.org/V2/(S(demotrackerapp))/OData/OData.svc/"
      }
    },

    routing: {
      config: {
        routerClass: sap.ui.core.routing.Router,
        viewType: "XML",
        viewPath: "sap.ui.demo.tracker.view",
        targetAggregation: "pages",
        targetControl: "idAppControl",
        clearTarget: false
      },
      routes: [
        {
          pattern: "",
          name: "main",
          view: "IssueList"
        }
      ]
    }
  },

  init: function() {
    "use strict";
    sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

    var mConfig = this.getMetadata().getConfig();

    // always use absolute paths relative to our own component
    // (relative paths will fail if running in the Fiori Launchpad)
    var rootPath = jQuery.sap.getModulePath("sap.ui.demo.tracker");

    // set i18n model
    var i18nModel = new sap.ui.model.resource.ResourceModel({
      bundleUrl: [rootPath, mConfig.resourceBundle].join("/")
    });
    this.setModel(i18nModel, "i18n");

    var sServiceUrl = mConfig.serviceConfig.serviceUrl;

    var bIsMocked = jQuery.sap.getUriParameters().get("responderOn") === "true";
    // start the mock server for the domain model
    if (bIsMocked) {
      jQuery.sap.require("sap.ui.app.MockServer");
      var oMockServer = new sap.ui.app.MockServer({
        rootUri: sServiceUrl
      });
      oMockServer.simulate("model/metadata.xml", "model/");
      oMockServer.start();

      sap.m.MessageToast.show("Running in demo mode with mock data.", {
        duration: 2000
      });
    }

    // Create and set domain model to the component
    var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
    this.setModel(oModel);

    this.getRouter().initialize();

  }

});
