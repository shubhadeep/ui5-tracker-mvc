/*global sap */
sap.ui.define(
  ["sap/ui/demo/tracker/base/Controller",
   "sap/ui/demo/tracker/util/Utility"],
  function (Controller, Utility) {
    "use strict";

    var controller = Controller.extend("sap.ui.demo.tracker.view.IssueList", {
      onInit: function () {
        this.getRouter()
            .getRoute("list")
            .attachMatched(this.onRouteMatched, this);
      },
      onRouteMatched: function () {
        return;
      },
      handleDelete: function (e) {
        var oList = e.getSource(),
            sPath = e.getParameter("listItem")
                     .getBindingContextPath();

        // after deletion put the focus back to the list
        oList.attachEventOnce("updateFinished", oList.focus, oList);
        this.deleteIssue(sPath);

      },
      deleteIssue: function (issueContextPath) {
        this.getView()
            .getModel()
            .remove(issueContextPath, {
              success: this.onIssueDeleted.bind(this),
              error: this.showBackendError
            });
      },
      handleCreatePress: function () {
        this.getRouter()
            .navTo("create");
      },
      handleIssueItemPress: function (e) {
        var detailPath = e.getSource()
                          .getBindingContextPath(),
            issueId = this.getView()
                          .getModel()
                          .getIdByBindingPath(detailPath);

        this.getRouter()
            .navTo("detail", {
              issueId: issueId
            });
      },
      onIssueDeleted: function () {
        var message = this.getI18nText("ISSUE_DELETE_SUCCESS_MESSAGE");

        Utility.displayMessageToast(message);
      }
    });

    return controller;
  }, true /*export*/);
