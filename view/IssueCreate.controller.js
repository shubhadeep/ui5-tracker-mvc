/*global window, sap, jQuery */
jQuery.sap.require("sap.m.MessageBox");

sap.ui.core.mvc.Controller.extend("sap.ui.demo.tracker.view.IssueCreate", {
  onInit: function () {
    "use strict";
    var newIssueOptions = {
          priorities: [
            { priority: "Select Priority", key: "" },
            { priority: "High", key: "High" },
            { priority: "Medium", key: "Medium" },
            { priority: "Low", key: "Low" }
          ],
          owners: [
            { owner: "Select owner", key: "" },
            { owner: "John Smith", key: "01" },
            { owner: "Mary Jane", key: "02" },
            { owner: "Jane Doe", key: "03" }
          ]
        };

    this.getView().setModel(new sap.ui.model.json.JSONModel(newIssueOptions), "newIssueOptions");

    this.getView().setModel(new sap.ui.model.json.JSONModel(this.newIssueData), "newIssue");
    sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(this.onRouteMatched, this);

  },
  newIssueData: {
    Detail: {
      Name: "",
      Description: "",
      Priority: "",
      Owner: ""
    }
  },
  onRouteMatched: function (e) {
    "use strict";
  },
  handleCancelPress: function (e) {
    "use strict";
    sap.ui.core.UIComponent.getRouterFor(this).navTo("list");
  },
  handleSavePress: function (e) {
    "use strict";
    this.getView()
        .getModel()
        .create("/Issues",
          this.getNewIssueData(),
          {
            success: this.onIssueCreatedSuccess.bind(this),
            error: this.showBackendError
          });
  },
  getNewIssueData: function () {
    "use strict";
    var view = this.getView(),
        newIssue = view.getModel("newIssue").getData().Detail;

    newIssue.Created = new Date();
    return newIssue;
  },
  onIssueCreatedSuccess: function (obj, response) {
    "use strict";
    sap.ui.core.UIComponent.getRouterFor(this).navTo("detail", {issueId: obj.ID});
    window.setTimeout(function () {
      sap.m.MessageToast.show("Created new issue", { duration: 2000 });
    }, 0);
    this.initializeNewIssue(this.newIssueData);
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
  },
  initializeNewIssue: function (data) {
    "use strict";
    this.getView().getModel("newIssue").setData(data);
  }
});
