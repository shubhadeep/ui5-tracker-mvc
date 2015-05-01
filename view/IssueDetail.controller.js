/*global sap window */
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
  },
  handleDeletePress: function (e) {
    "use strict";
    var issuePath = e.getSource()
                     .getBindingContext()
                     .getPath();

    this.deleteIssue(issuePath);
  },
  deleteIssue: function (issueContextPath) {
    "use strict";
    // send a delete request to the odata service
    this.getView().getModel().remove(issueContextPath, {
      success: this.onDeleteIssueSuccess.bind(this),
      error: this.onDeleteIssueError
    });
  },
  onDeleteIssueSuccess: function (data, response) {
    "use strict";

    sap.ui.core.UIComponent.getRouterFor(this)
                           .navTo("list");

    window.setTimeout(function () {
      sap.m.MessageToast.show(this.getI18nText("ISSUE_DELETE_SUCCESS_MESSAGE"));
    }.bind(this), 0);
  },
  onDeleteIssueError: function (error) {
    "use strict";
    sap.m.MessageToast.show(this.getI18nText("ISSUE_DELETE_ERROR_MESSAGE"));
  },
  getI18nText: function (key) {
    "use strict";
    return this.getOwnerComponent()
               .getModel("i18n")
               .getResourceBundle()
               .getText(key);
  }
});
