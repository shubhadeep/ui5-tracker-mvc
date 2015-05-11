/*global jQuery, sap*/
jQuery.sap.declare("sap.ui.demo.tracker.model.CreateIssueModel");

sap.ui.model.json.JSONModel.extend("sap.ui.demo.tracker.model.CreateIssueModel", {
  data: {
    priorities: [
      { priority: "Select Priority", key: "" },
      { priority: "High", key: "1" },
      { priority: "Medium", key: "2" },
      { priority: "Low", key: "3" }
    ],
    owners: [
      { owner: "Select owner", key: "" },
      { owner: "John Smith", key: "01" },
      { owner: "Mary Jane", key: "02" },
      { owner: "Jane Doe", key: "03" }
    ],
    newIssueObject: {
      Name: "",
      Description: "",
      Priority: "",
      Owner: ""
    },
    newIssueValueState: {
      Name: sap.ui.core.ValueState.None,
      Priority: sap.ui.core.ValueState.None
    },
    newIssueFieldErrors: {
      Name: "Name is required" // TODO: Storing field messages in model
    }
  },
  initializeNewIssue: function () {
    "use strict";

    this.setProperty("/newIssueObject", {
      Name: "",
      Description: "",
      Priority: "",
      Owner: ""
    });

    this.setProperty("/newIssueValueState", {
      Name: sap.ui.core.ValueState.None,
      Priority: sap.ui.core.ValueState.None // Does not work !
    });

  },
  getNewIssueObject: function () {
    "use strict";

    var newIssueObject = jQuery.extend(this.getProperty("/newIssueObject"), {});
    newIssueObject.Created = new Date();
    return newIssueObject;
  },
  validate: function () {
    "use strict";

    var inputObject = this.getNewIssueObject(),
        errors = {},
        valid = true;
    if (!this.isNonEmptyStringProperty("Name", inputObject)) {
      errors.Name = "Name is required";
      valid = false;
    }
    if (!this.isNonEmptyStringProperty("Priority", inputObject)) {
      errors.Priority = "Priority is required";
      valid = false;
    }
    return {
      valid: valid,
      errors: errors
    };
  },
  isNonEmptyStringProperty: function (property, object) {
    "use strict";

    return ((property in object) &&
            (object[property].toString().trim().length > 0));
  }
});
