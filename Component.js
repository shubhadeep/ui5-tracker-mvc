/*global jQuery, sap, window */
jQuery.sap.declare("sap.ui.demo.tracker.Component");
jQuery.sap.require("sap.ui.demo.tracker.model.IssueModel");

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
        serviceUrl: "/OData/OData.svc/"
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
          name: "list",
          view: "IssueList",
          viewLevel: 0
        },
        {
          pattern: "issue/{issueId}",
          name: "detail",
          view: "IssueDetail",
          viewLevel: 1
        },
        {
          pattern: "edit/{issueId}",
          name: "edit",
          view: "IssueEdit",
          viewLevel: 1
        },
        {
          pattern: "create",
          name: "create",
          view: "IssueCreate",
          viewLevel: 1
        },
        {
          name: "catchAllMaster",
          view: "NotFound",
          pattern: ":all*:"
        }
      ]
    }
  },

  init: function() {
    "use strict";

    var mConfig, sServiceUrl;

    sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

    mConfig = this.getMetadata().getConfig();
    this.setI18nModel(mConfig);
    sServiceUrl = mConfig.serviceConfig.serviceUrl;

    if (this.useMockData()) {
      this.startMockServer(sServiceUrl);
    }

    this.setModel(new sap.ui.demo.tracker.model.IssueModel(sServiceUrl, true));

    this.initializeRouter(this.this.getRouter());
  },
  destroy: function () {
    "use strict";

    if (this.routeHandler) {
      this.routeHandler.destroy();
    }
    sap.ui.core.UIComponent.destroy.apply(this, arguments);
  },
  setI18nModel: function (mConfig) {
    "use strict";

    // always use absolute paths relative to our own component
    // (relative paths will fail if running in the Fiori Launchpad)
    var rootPath = jQuery.sap.getModulePath("sap.ui.demo.tracker"),
        i18nModel = new sap.ui.model.resource.ResourceModel({
          bundleUrl: [rootPath, mConfig.resourceBundle].join("/")
        });

    this.setModel(i18nModel, "i18n");
  },
  useMockData: function () {
    "use strict";

    return jQuery.sap.getUriParameters().get("responderOn") === "true";
  },
  startMockServer: function (serviceUrl) {
    "use strict";

    jQuery.sap.require("sap.ui.app.MockServer");
    var oMockServer = new sap.ui.app.MockServer({
      rootUri: serviceUrl
    });

    oMockServer.simulate("model/metadata.xml", "model/");
    oMockServer.start();

    this.displayMessageToast("Running in demo mode with mock data.");

  },
  displayMessageToast: function (message) {
    "use strict";

    window.setTimeout(function () {
      sap.m.MessageToast.show(message);
    }, 0);
  },
  initializeRouter: function (router) {
    "use strict";

    this.routeHandler = new sap.m.routing.RouteMatchedHandler(router);
    router.initialize();
  }
});
