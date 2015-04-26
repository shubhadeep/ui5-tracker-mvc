/*global sap */
sap.ui.core.mvc.Controller.extend("sap.ui.demo.tracker.view.IssueCreate", {
  onInit: function () {
    "use strict";
    var newIssueOptions = {
          priorities: [
            { priority: "Select Priority" , key: "" },
            { priority: "High" , key: "High" },
            { priority: "Medium", key: "Medium" },
            { priority: "Low", key: "Low" }
          ],
          owners: [
            { owner: "Select owner", key: "" },
            { owner: "John Smith", key: "01" },
            { owner: "Mary Jane", key: "02" },
            { owner: "Jane Doe", key: "03" }
          ]
        },
        newissueData = {
          Name: "",
          Description: "",
          Priority: "",
          Owner: ""
        };

    this.getView().setModel(new sap.ui.model.json.JSONModel(newIssueOptions), "newIssueOptions");
    this.getView().setModel(new sap.ui.model.json.JSONModel(newissueData), "newIssue");
    sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(this.onRouteMatched, this);

  },
  onRouteMatched: function (e) {
    "use strict";
  },
  handleCancelPress: function (e) {
    "use strict";
    alert("Cancel not implemented!");
  },
  handleSavePress: function (e) {
    "use strict";
    alert("Save not implemented!");
  },
  initializeNewIssue: function (data) {
    this.getView().getModel("newProduct").setData(data);
  }
});
