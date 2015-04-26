/*global sap */
sap.ui.core.mvc.Controller.extend("sap.ui.demo.tracker.view.IssueCreate", {
  onInit: function () {
    "use strict";
    sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(this.onRouteMatched, this);
  },
  onRouteMatched: function (e) {
    "use strict";
  }
});
