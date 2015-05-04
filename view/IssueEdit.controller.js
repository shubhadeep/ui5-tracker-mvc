/*global window sap jQuery */
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.ui.demo.tracker.model.CreateIssueModel");

sap.ui.core.mvc.Controller.extend("sap.ui.demo.tracker.view.IssueEdit", {
  onInit: function () {
    "use strict";

    sap.ui.core.UIComponent.getRouterFor(this)
                           .attachRouteMatched(this.onRouteMatched, this);

  },
  onRouteMatched: function (e) {
    "use strict";

    var issueId,
        issueBindingPath;

    if (!e.getParameters().name === "edit") {
      return;
    }

    issueId = e.getParameters().arguments.issueId;
    issueBindingPath = this.getView()
                           .getModel()
                           .getBindingPathById(issueId);

    this.loadEditIssueData(issueBindingPath);
  },
  loadEditIssueData: function (path) {
    "use strict";

    var model = this.getView().getModel();

    model.read(path, {
      success: this.setEditIssueModel.bind(this),
      error: this.showBackendError
    });
  },
  setEditIssueModel: function (data) {
    "use strict";

    var editIssueModel = new sap.ui.demo.tracker.model.CreateIssueModel();
    editIssueModel.setData(editIssueModel.data);
    editIssueModel.setProperty("/newIssueObject", data || {});

    this.getView()
        .setModel(editIssueModel, "editIssue");
  },
  handleCancelPress: function (e) {
    "use strict";

    this.getView()
        .getModel("editIssue")
        .initializeNewIssue();

    sap.ui.core.UIComponent.getRouterFor(this)
                           .navTo("list");
  },
  handleSavePress: function (e) {
    "use strict";

    var view = this.getView(),
        editIssueModel = view.getModel("editIssue"),
        validationResult = editIssueModel.validate(),
        issueObject;

    if (validationResult.valid) {
      issueObject = editIssueModel.getNewIssueObject();

      view.getModel()
          .updateExisting(issueObject, {
            success: this.onIssueEditedSuccess.bind(this, issueObject.ID),
            error: this.showBackendError
          });
    }
    else {
      this.displayValidationErrors(validationResult.errors);
    }
  },
  displayValidationErrors: function (errors) {
    "use strict";

    jQuery.sap.require("sap.m.MessageBox");
    sap.m.MessageBox.show("Validation Error", {
      title: "Invalid Inputs"
    });
  },
  onIssueEditedSuccess: function (issueId) {
    "use strict";
    sap.ui.core.UIComponent.getRouterFor(this)
                          .navTo("detail", {issueId: issueId}, true);

    window.setTimeout(function () {
      sap.m.MessageToast.show("Saved changes");
    }, 0);

    this.getView()
        .getModel("editIssue")
        .initializeNewIssue();
  },
  showBackendError: function (error) {
    "use strict";

    sap.m.MessageBox.show(
      error.responseText, {
        icon: sap.m.MessageBox.Icon.ERROR,
        title: error.message,
        actions: [sap.m.MessageBox.Action.OK]
      }
    );
  },
  getI18nText: function (key) {
    "use strict";

    return this.getOwnerComponent()
               .getModel("i18n")
               .getResourceBundle()
               .getText(key);
  }
});
