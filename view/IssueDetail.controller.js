/*global sap jQuery window */
jQuery.sap.require("sap.ui.demo.tracker.base.Controller");

sap.ui.demo.tracker.base.Controller.extend("sap.ui.demo.tracker.view.IssueDetail", {
  onInit: function () {
    "use strict";

    this.getRouter()
        .attachRouteMatched(this.onRouteMatched, this);
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
  handleEditPress: function (e) {
    "use strict";

    var issuePath = e.getSource()
                     .getBindingContext()
                     .getPath(),
        issueId = this.getView()
                      .getModel()
                      .getIdByBindingPath(issuePath);

    this.getRouter()
        .navTo("edit", {
          issueId: issueId
        });
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

    var model = this.getView()
                    .getModel();

    // send a delete request to the odata service
    model.remove(issueContextPath, {
      success: this.onIssueDeleted.bind(this),
      error: this.showBackendError
    });
  },
  onIssueDeleted: function () {
    "use strict";

    this.getRouter()
        .navTo("list");

    this.showMessageToast(this.getI18nText("ISSUE_DELETE_SUCCESS_MESSAGE"));
  }
});
