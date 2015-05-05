/*global window sap jQuery */
jQuery.sap.require("sap.ui.demo.tracker.base.Controller");
jQuery.sap.require("sap.ui.demo.tracker.model.CreateIssueModel");

sap.ui.demo.tracker.base.Controller.extend("sap.ui.demo.tracker.view.IssueCreate", {
  onInit: function () {
    "use strict";
    var newIssueModel = new sap.ui.demo.tracker.model.CreateIssueModel();

    newIssueModel.setData(newIssueModel.data);
    
    this.getView()
        .setModel(newIssueModel, "newIssue");

    this.getRouter()
        .attachRouteMatched(this.onRouteMatched, this);
  },
  onRouteMatched: function () {
    "use strict";

    this.getView()
        .getModel("newIssue")
        .initializeNewIssue();
  },
  handleSavePress: function (e) {
    "use strict";

    var view = this.getView(),
        newIssueModel = view.getModel("newIssue"),
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

    this.getView()
        .getModel("newIssue")
        .initializeNewIssue();

    this.getRouter()
        .navTo("list");
  },
  onIssueCreated: function (obj, response) {
    "use strict";

    this.getRouter()
        .navTo("detail", {
          issueId: obj.ID
        });

    this.showMessageToast("Created new issue");

    this.getView()
        .getModel("newIssue")
        .initializeNewIssue();
  }
});
