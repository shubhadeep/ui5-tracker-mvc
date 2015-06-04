/*global sap */
sap.ui.define(
  ["sap/ui/demo/tracker/base/Controller",
   "sap/ui/demo/tracker/util/Utility"],
  function (Controller, Utility) {
    "use strict";

    var controller = Controller.extend("sap.ui.demo.tracker.view.IssueDetail", {
      onInit: function () {
        this.getRouter()
            .attachRouteMatched(this.onRouteMatched, this);
      },
      onRouteMatched: function (e) {
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
        var issuePath = e.getSource()
                         .getBindingContext()
                         .getPath();

        this.deleteIssue(issuePath);
      },
      deleteIssue: function (issueContextPath) {
        var model = this.getView()
                        .getModel();

        // send a delete request to the odata service
        model.remove(issueContextPath, {
          success: this.onIssueDeleted.bind(this),
          error: this.showBackendError
        });
      },
      onIssueDeleted: function () {
        var message = this.getI18nText("ISSUE_DELETE_SUCCESS_MESSAGE");

        this.getRouter()
            .navTo("list");

        Utility.displayMessageToast(message);
      }
    });

    return controller;
  }, true /*export*/);
