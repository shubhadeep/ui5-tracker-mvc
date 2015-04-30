/*global window, sap, jQuery */
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.ui.demo.tracker.model.CreateIssueModel");

sap.ui.core.mvc.Controller.extend("sap.ui.demo.tracker.view.IssueCreate", {
  onInit: function () {
    "use strict";
    var newIssueModel = new sap.ui.demo.tracker.model.CreateIssueModel();
    newIssueModel.setData(newIssueModel.data);

    this.getView()
        .setModel(newIssueModel, "newIssue");

    sap.ui.core.UIComponent.getRouterFor(this)
                           .attachRouteMatched(this.onRouteMatched, this);

  },
  onRouteMatched: function (e) {
    "use strict";
    // TODO
    return;
  },
  handleCancelPress: function (e) {
    "use strict";
    sap.ui.core.UIComponent.getRouterFor(this)
                           .navTo("list");
  },
  handleSavePress: function (e) {
    "use strict";
    var view = this.getView(),
        newIssue = view.getModel("newIssue")
                       .getNewIssueObject();

    view.getModel()
        .createNew(newIssue, {
          success: this.onIssueCreatedSuccess.bind(this),
          error: this.showBackendError
        });
  },
  onIssueCreatedSuccess: function (obj, response) {
    "use strict";
    sap.ui.core.UIComponent.getRouterFor(this)
                          .navTo("detail", {issueId: obj.ID});

    window.setTimeout(function () {
      sap.m.MessageToast.show("Created new issue", { duration: 2000 });
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
