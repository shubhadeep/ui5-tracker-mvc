/*global window sap jQuery */
jQuery.sap.require("sap.ui.demo.tracker.base.Controller");
jQuery.sap.require("sap.ui.demo.tracker.model.CreateIssueModel");
jQuery.sap.require("sap.ui.demo.tracker.util.Utility");

sap.ui.demo.tracker.base.Controller.extend("sap.ui.demo.tracker.view.IssueEdit", {
  onInit: function () {
    "use strict";

    var editIssueModel = new sap.ui.demo.tracker.model.CreateIssueModel();

    editIssueModel.setData(editIssueModel.data);

    this.getView()
        .setModel(editIssueModel, "editIssue");

    this._editIssueModel = editIssueModel;

    this.getRouter()
        .attachRouteMatched(this.onRouteMatched, this);

  },
  onRouteMatched: function (e) {
    "use strict";

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
    "use strict";

    model.read(path, {
      success: this.setEditIssueData.bind(this),
      error: this.showBackendError
    });
  },
  setEditIssueData: function (data) {
    "use strict";

    this._editIssueModel.setProperty("/newIssueObject", data || {});

  },
  handleCancelPress: function (e) {
    "use strict";

    this._editIssueModel.initializeNewIssue();

    this.getRouter()
        .navTo("list");
  },
  handleSavePress: function (e) {
    "use strict";

    var view = this.getView(),
        editIssueModel = this._editIssueModel,
        validationResult = editIssueModel.validate(),
        issueObject;

    if (validationResult.valid) {
      issueObject = editIssueModel.getNewIssueObject();

      view.getModel()
          .updateExisting(issueObject, {
            success: this.onIssueEdited.bind(this, issueObject.ID),
            error: this.showBackendError
          });
    }
    else {
      this.displayValidationErrors(validationResult.errors);
    }
  },
  onIssueEdited: function (issueId) {
    "use strict";

    var util = sap.ui.demo.tracker.util.Utility,
        message = this.getI18nText("ISSUE_UPDATE_SUCCESS_MESSAGE");

    this.getRouter()
        .navTo("detail", {
          issueId: issueId
        }, true);

    util.displayMessageToast(message);

    this._editIssueModel.initializeNewIssue();
  }
});
