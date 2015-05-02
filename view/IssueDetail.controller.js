/*global sap jQuery window */
sap.ui.core.mvc.Controller.extend("sap.ui.demo.tracker.view.IssueDetail", {
  onInit: function () {
    "use strict";

    var router = sap.ui.core.UIComponent.getRouterFor(this);
    router.attachRouteMatched(this.onRouteMatched, this);
  },
  onRouteMatched: function (e) {
    "use strict";

    var routeParameters = e.getParameters(),
        issueBindingPath,
        view,
        issueId;

    if (!routeParameters.name === "detail") {
      return;
    }

    view = this.getView();
    issueId = routeParameters.arguments.issueId;
    issueBindingPath = view.getModel()
                           .getBindingPathById(issueId);

    view.bindElement(issueBindingPath);
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

    var model = this.getView().getModel();

    // send a delete request to the odata service
    model.remove(issueContextPath, {
      success: this.onDeleteIssueSuccess.bind(this),
      error: this.onDeleteIssueError
    });
  },
  onDeleteIssueSuccess: function () {
    "use strict";

    var router = sap.ui.core.UIComponent.getRouterFor(this);
    router.navTo("list");

    window.setTimeout(function () {
      var successMessage = this.getI18nText("ISSUE_DELETE_SUCCESS_MESSAGE");
      sap.m.MessageToast.show(successMessage);
    }.bind(this), 0);
  },
  onDeleteIssueError: function (error) {
    "use strict";

    var errorMessage = this.getI18nText("ISSUE_DELETE_ERROR_MESSAGE");
    jQuery.sap.require("sap.m.MessageBox");

    sap.m.MessageBox.show(error.responseText, {
      title: errorMessage
    });
  },
  getI18nText: function (key) {
    "use strict";

    return this.getOwnerComponent()
               .getModel("i18n")
               .getResourceBundle()
               .getText(key);
  }
});
