/*global sap */
sap.ui.define(
  ["sap/ui/demo/tracker/base/Controller",
   "sap/ui/demo/tracker/model/CreateIssueModel",
   "sap/ui/demo/tracker/util/Utility"],
  function (Controller, CreateIssueModel, Utility) {
    "use strict";

    var controller = Controller.extend("sap.ui.demo.tracker.view.IssueEdit", {
      onInit: function () {
        var editIssueModel = new CreateIssueModel();

        editIssueModel.setData(editIssueModel.data);

        this.byId("idEditForm")
            .setModel(editIssueModel);

        this._editIssueModel = editIssueModel;

        this.getRouter()
            .attachRouteMatched(this.onRouteMatched, this);

      },
      onRouteMatched: function (e) {
        var issueId,
            model,
            issueBindingPath;

        if (!e.getParameters().name === "edit") {
          return;
        }

        issueId = e.getParameters().arguments.issueId;

        model = this.getView()
                    .getModel();

        issueBindingPath = model.getBindingPathById(issueId);

        this.loadEditIssueData(issueBindingPath, model);
      },
      loadEditIssueData: function (path, model) {
        model.read(path, {
          success: this.setEditIssueData.bind(this),
          error: this.showBackendError
        });
      },
      setEditIssueData: function (data) {
        this._editIssueModel.setProperty("/newIssueObject", data || {});

      },
      handleCancelPress: function () {
        this._editIssueModel.initializeNewIssue();

        this.getRouter()
            .navTo("list");
      },
      handleSavePress: function () {
        this._editIssueModel.validate()
                            .done(this.saveEditedIssue.bind(this))
                            .fail(this.displayValidationErrors.bind(this));
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

        this._editIssueModel.initializeNewIssue();
      },
      displayValidationErrors: function (errors) {
        Controller.prototype.displayValidationErrors.apply(this, arguments);

        // TODO refactor this - code repeats with create
        Object.keys(errors).forEach(function (error) {
          this._editIssueModel.setProperty("/newIssueValueState/" + error, sap.ui.core.ValueState.Error);
        }, this);
      }
    });

    return controller;
  }, true /*export*/);
