/*global window sap jQuery */
jQuery.sap.require("sap.ui.demo.tracker.base.Controller");
jQuery.sap.require("sap.ui.demo.tracker.model.CreateIssueModel");
jQuery.sap.require("sap.ui.demo.tracker.util.Utility");

sap.ui.demo.tracker.base.Controller.extend("sap.ui.demo.tracker.view.IssueCreate", {
  onInit: function () {
    "use strict";

    var newIssueModel = new sap.ui.demo.tracker.model.CreateIssueModel();

    newIssueModel.setData(newIssueModel.data);

    this.getView()
        .setModel(newIssueModel, "newIssue");

    this._newIssueModel = newIssueModel;

    this.getRouter()
        .attachRouteMatched(this.onRouteMatched, this);
  },
  onRouteMatched: function (e) {
    "use strict";

    var routeParameters = e.getParameters();

    if (!routeParameters.name === "create") {
      return;
    }

    this._newIssueModel.initializeNewIssue();
  },
  handleSavePress: function (e) {
    "use strict";

    var view = this.getView(),
        newIssueModel = this._newIssueModel,
        validationResult = newIssueModel.validate(),
        issueObject;

    if (validationResult.valid) {
      issueObject = newIssueModel.getNewIssueObject();

      view.getModel()
          .createNew(issueObject, {
            success: this.onIssueCreated.bind(this),
            error: this.showBackendError
          });
    }
    else {
      this.displayValidationErrors(validationResult.errors);
    }
  },
  handleCancelPress: function (e) {
    "use strict";

    this._newIssueModel.initializeNewIssue();

    this.getRouter()
        .navTo("list");
  },
  onIssueCreated: function (obj, response) {
    "use strict";

    var util = sap.ui.demo.tracker.util.Utility,
        message = this.getI18nText("ISSUE_CREATE_SUCCESS_MESSAGE");

    this.getRouter()
        .navTo("detail", {
          issueId: obj.ID
        });

    util.displayMessageToast(message);

    this._newIssueModel.initializeNewIssue();
  }
});
