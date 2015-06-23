/*global sap jQuery*/
sap.ui.define(["sap/ui/model/json/JSONModel"],
  function (JSONModel) {
    "use strict";

    var model = JSONModel.extend("sap.ui.demo.tracker.model.CreateIssueModel", {
      data: {
        priorities: [
          { key: "" },
          { key: "1" },
          { key: "2" },
          { key: "3" }
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
        validationProperties: {
          Name: {
            validator: function (object, property, context) {},
            errorMessage: "Name is required"
          },
          Priority: {
            validator: function (object, property, context) {},
            errorMessage: "Priority is required"
          }
        },
        fieldErrorMessages: {
          Name: "Name is required", // TODO: Storing field messages in i18n model
          Priority: "Priority is required"
        }
      },
      constructor: function () {
        JSONModel.apply(this, arguments);
        this.setData(this.data);
      },
      initializeNewIssue: function () {
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
        var newIssueObject = jQuery.extend(this.getProperty("/newIssueObject"), {});
        newIssueObject.Created = new Date();
        return newIssueObject;
      },
      validate: function (onValid, onInvalid, context) {
        var validated = jQuery.Deferred(),
            inputObject = this.getNewIssueObject(),
            errors = {},
            valid,
            callbackContext = context || this,
            properties = ["Name", "Priority"];

        valid = properties.map(function (property) {
          if (!this.isNonEmptyStringProperty(property, inputObject)) {
            errors[property] = this.data.fieldErrorMessages[property];
            return false;
          }
          return true;
        }, this).every(function (isValid) {
          return isValid;
        });

        if (valid) {
          validated.resolveWith(callbackContext, [inputObject]);
        } else {
          validated.rejectWith(callbackContext, [errors]);
        }
        return validated.promise();
      },
      isNonEmptyStringProperty: function (property, object) {
        return ((property in object) &&
                (object[property].toString().trim().length > 0));
      }
    });

    return model;
  });
