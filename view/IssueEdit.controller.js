/*global sap */
sap.ui.define(
  ["sap/ui/demo/tracker/base/Controller",
   "sap/ui/demo/tracker/util/Utility"],
  function (Controller, Utility) {
    "use strict";

    return Controller.extend("sap.ui.demo.tracker.view.IssueEdit", {
      onInit: function () {
        this.editFormView = this.byId("editFormView");

        this.getRouter()
            .getRoute("edit")
            .attachMatched(this.onRouteMatched, this);
      },
      onRouteMatched: function (e) {
        var issueId = e.getParameters().arguments.issueId;

        this.loadEditIssueData(issueId);
      },
      loadEditIssueData: function (issueId) {
        var model = this.getView()
                        .getModel(),
            path = model.getBindingPathById(issueId);

        this.editFormView.fireEvent("initializeNewIssue");

        model.read(path, {
          success: this.setEditIssueData.bind(this),
          error: this.showBackendError
        });
      },
      setEditIssueData: function (data) {
        this.editFormView.fireEvent("setEditFormData", data);
      },
      handleCancelPress: function () {
        this.getRouter()
            .navTo("list");
      },
      handleSavePress: function () {
        var editModel = this.editFormView.getModel();

        editModel.validate()
                 .done(this.saveEditedIssue.bind(this))
                 .fail(this.onValidationfailed.bind(this));
      },
      saveEditedIssue: function (issueObject) {
        this.getView()
            .getModel()
            .updateExisting(issueObject, {
              success: this.onIssueEdited.bind(this, issueObject.ID),
              error: this.showBackendError
            });
      },
      onIssueEdited: function (issueId) {
        var message = this.getI18nText("ISSUE_UPDATE_SUCCESS_MESSAGE");

        this.getRouter()
            .navTo("detail", {
              issueId: issueId
            }, true);

        Utility.displayMessageToast(message);
      },
      onValidationfailed: function (errors) {
        this.editFormView.fireEvent("validationFailed", errors);
      }
    });
  });
