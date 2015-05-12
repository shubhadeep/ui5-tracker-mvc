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

    this._editIssueModel.validate()
                        .done(this.saveEditedIssue.bind(this))
                        .fail(this.displayValidationErrors.bind(this));
  },
  saveEditedIssue: function (issueObject) {
    "use strict";
    
    this.getView()
        .getModel()
        .updateExisting(issueObject, {
          success: this.onIssueEdited.bind(this, issueObject.ID),
          error: this.showBackendError
        });
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
  },
  displayValidationErrors: function (errors) {
    "use strict";

    sap.ui.demo.tracker.base.Controller.prototype.displayValidationErrors.apply(this, arguments);
    
    // TODO refactor this - code repeats with create
    Object.keys(errors).forEach(function (error) {
      this._editIssueModel.setProperty("/newIssueValueState/" + error, sap.ui.core.ValueState.Error);
    }, this);

  },
});
