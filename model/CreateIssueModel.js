/*global jQuery, sap*/
jQuery.sap.declare("sap.ui.demo.tracker.model.CreateIssueModel");

sap.ui.model.json.JSONModel.extend("sap.ui.demo.tracker.model.CreateIssueModel", {
  data: {
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
    ],
    newIssueObject: {
      Name: "",
      Description: "",
      Priority: "",
      Owner: ""
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
  },
  getNewIssueObject: function () {
    "use strict";
    var newIssueObject = jQuery.extend(this.getProperty("/newIssueObject"), {});
    newIssueObject.Created = new Date();
    return newIssueObject;
  },
  getIssueIdByBindingPath: function (bindingPath) {
    "use strict";
    return bindingPath.split("/Issues(")[1].split(")")[0];
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
