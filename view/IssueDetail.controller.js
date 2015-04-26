/*global sap */
sap.ui.core.mvc.Controller.extend("sap.ui.demo.tracker.view.IssueDetail", {
  onInit: function () {
    "use strict";
    sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(this.onRouteMatched, this);
  },
  onRouteMatched: function (e) {
    "use strict";
    var routeParameters = e.getParameters(),
        issueBindingPath;
    if (!routeParameters.name === "detail") {
      return;
    }
    issueBindingPath = "/Issues(" + routeParameters.arguments.issueId + ")";
    this.getView().bindElement(issueBindingPath);
  }
});
