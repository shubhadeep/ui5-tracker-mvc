/*global sap */
sap.ui.define(
  ["sap/ui/demo/tracker/base/Controller",
   "sap/ui/demo/tracker/util/Utility"],
  function (Controller, Utility) {
    "use strict";

    return Controller.extend("sap.ui.demo.tracker.view.IssueCreate", {
      onInit: function () {
        this.createFormView = this.byId("createFormView");

        this.getRouter()
            .attachRouteMatched(this.onRouteMatched, this);
      },
      onRouteMatched: function (e) {
        var routeParameters = e.getParameters();

        if (routeParameters.name !== "create") {
          return;
        }

        this.createFormView.fireEvent("initializeNewIssue");
      },
      handleSavePress: function (e) {
        var createModel = this.createFormView.getModel();
        
        createModel.validate()
                 .done(this.createIssue.bind(this))
                 .fail(this.onValidationfailed.bind(this));
      },
      handleCancelPress: function (e) {
        this.getRouter()
            .navTo("list");
      },
      createIssue: function (issueObject) {
        this.getView()
            .getModel()
            .createNew(issueObject, {
              success: this.onIssueCreated.bind(this),
              error: this.showBackendError
            });
      },
      onValidationfailed: function (errors) {
        this.createFormView.fireEvent("validationFailed", errors);
      },
      onIssueCreated: function (obj) {
        var message = this.getI18nText("ISSUE_CREATE_SUCCESS_MESSAGE");

        this.getRouter()
            .navTo("detail", {
              issueId: obj.ID
            });

        Utility.displayMessageToast(message);
      }
    });
  });
