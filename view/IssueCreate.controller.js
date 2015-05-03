/*global window sap jQuery */
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.ui.demo.tracker.model.CreateIssueModel");

sap.ui.core.mvc.Controller.extend("sap.ui.demo.tracker.view.IssueCreate", {
  onInit: function () {
    "use strict";

    sap.ui.core.UIComponent.getRouterFor(this)
                           .attachRouteMatched(this.onRouteMatched, this);

  },
  onRouteMatched: function (e) {
    "use strict";
    // TODO: Refactor
    var newIssueModel = new sap.ui.demo.tracker.model.CreateIssueModel(),
        issueId,
        model,
        data;

    if (e.getParameters().name === "create") {
      newIssueModel.setData(newIssueModel.data);
    }
    else if (e.getParameters().name === "edit") {
      issueId = e.getParameters().arguments.issueId;

      model = this.getView().getModel();
      data = model.getData(model.getBindingPathById(issueId));
      newIssueModel.setData(newIssueModel.data);
      newIssueModel.setProperty("/newIssueObject", data);
    }

    this.getView()
        .setModel(newIssueModel, "newIssue");
  },
  handleCancelPress: function (e) {
    "use strict";

    this.getView()
        .getModel("newIssue")
        .initializeNewIssue();

    sap.ui.core.UIComponent.getRouterFor(this)
                           .navTo("list");
  },
  handleSavePress: function (e) {
    "use strict";

    var view = this.getView(),
        newIssueModel = view.getModel("newIssue"),
        validationResult = newIssueModel.validate(),
        issueObject;

    if (validationResult.valid) {
      issueObject = newIssueModel.getNewIssueObject();

      // TODO: Refactor following if-statement to decouple edit and create
      if (issueObject.ID) { // UPDATE
        view.getModel()
            .update(view.getModel().getBindingPathById(issueObject.ID), issueObject, {
              success: this.onIssueCreatedSuccess.bind(this),
              error: this.showBackendError,
              merge: false
            });
      }
      else { // CREATE
      view.getModel()
          .createNew(issueObject, {
            success: this.onIssueCreatedSuccess.bind(this),
            error: this.showBackendError
          });
      }
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
  onIssueCreatedSuccess: function (obj, response) {
    "use strict";

    sap.ui.core.UIComponent.getRouterFor(this)
                          .navTo("detail", {issueId: obj.ID});

    window.setTimeout(function () {
      sap.m.MessageToast.show("Created new issue");
    }, 0);

    this.getView()
        .getModel("newIssue")
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
