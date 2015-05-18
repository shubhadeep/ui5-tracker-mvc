/*global sap */
sap.ui.define(
  ["sap/ui/demo/tracker/base/Controller",
   "sap/ui/demo/tracker/model/CreateIssueModel",
   "sap/ui/demo/tracker/util/Utility"],
  function (Controller, CreateIssueModel, Utility) {
    "use strict";

    var controller = Controller.extend("sap.ui.demo.tracker.view.IssueCreate", {
      onInit: function () {
        var newIssueModel = new CreateIssueModel();

        newIssueModel.setData(newIssueModel.data);

        this.getView()
            .setModel(newIssueModel, "newIssue");

        this._newIssueModel = newIssueModel;

        this.getRouter()
            .attachRouteMatched(this.onRouteMatched, this);
      },
      onRouteMatched: function (e) {
        var routeParameters = e.getParameters();

        if (!routeParameters.name === "create") {
          return;
        }

        this._newIssueModel.initializeNewIssue();
      },
      handleSavePress: function (e) {
        this._newIssueModel.validate()
                           .done(this.createIssue.bind(this))
                           .fail(this.displayValidationErrors.bind(this));
      },
      displayValidationErrors: function (errors) {
        "use strict";

        Controller.prototype.displayValidationErrors.apply(this, arguments);

        // TODO refactor this
        Object.keys(errors).forEach(function (error) {
          this._newIssueModel.setProperty("/newIssueValueState/" + error, sap.ui.core.ValueState.Error);
        }, this);

      },
      createIssue: function (issueObject) {
        this.getView()
            .getModel()
            .createNew(issueObject, {
              success: this.onIssueCreated.bind(this),
              error: this.showBackendError
            });
      },
      handleCancelPress: function (e) {
        this._newIssueModel.initializeNewIssue();

        this.getRouter()
            .navTo("list");
      },
      onIssueCreated: function (obj) {
        var message = this.getI18nText("ISSUE_CREATE_SUCCESS_MESSAGE");

        this.getRouter()
            .navTo("detail", {
              issueId: obj.ID
            });

        Utility.displayMessageToast(message);

        this._newIssueModel.initializeNewIssue();
      }
    });

    return controller;
  }, true /*export*/);
