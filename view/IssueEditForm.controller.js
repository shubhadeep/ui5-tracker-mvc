/*global sap */
sap.ui.define(
  ["sap/ui/demo/tracker/base/Controller",
   "sap/ui/demo/tracker/model/IssueEditModel",
   "sap/m/MultiInput",
   "sap/m/MessageBox"],
  function (Controller, IssueEditModel, MultiInput, MessageBox) {
    "use strict";

    return Controller.extend("sap.ui.demo.tracker.view.IssueEditForm", {
      onInit: function (e) {
        var editIssueModel = new IssueEditModel(),
            view = this.getView();

        editIssueModel.setData(editIssueModel.data);
        this.editIssueModel = editIssueModel;

        view.setModel(editIssueModel)
            .attachEvent("validationFailed", this.displayValidationErrors)
            .attachEvent("initializeNewIssue", this.initializeNewIssue.bind(this))
            .attachEvent("setEditFormData", this.setEditFormData.bind(this));

        this.attachRelatedIssuesValidation("relatedIssuesInput");
      },
      initializeNewIssue: function () {
        this.getView()
            .getModel()
            .initializeNewIssue();
      },
      setEditFormData: function (e) {
        this.getView()
            .getModel()
            .setProperty("/newIssueObject", e.getParameters() || {});
      },
      handleRelatedIssuesValueHelpRequest: function (e) {
        // TODO
        window.console.log("handleRelatedIssuesValueHelpRequest");
      },
      attachRelatedIssuesValidation: function (inputId) {
        this.byId(inputId)
            .addValidator(this.confirmTokenAddition.bind(this));
      },
      confirmTokenAddition: function (args) {
        MessageBox.confirm("Do you really want to add token \"" + args.text + "\"?", {
          onClose: this.onAddTokenDialogClose.bind(args),
          title: "add Token"
          });
        return MultiInput.WaitForAsyncValidation;
      },
      onAddTokenDialogClose: function (action) {
        if (action === MessageBox.Action.OK){
          var oToken = new sap.m.Token({key: this.text, text: this.text});
          this.asyncCallback(oToken);
        }
        else{
          this.asyncCallback(null);
        }
      },
      displayValidationErrors: function (e) {
        Controller.prototype.displayValidationErrors.apply(this.getController(), arguments);

        // TODO refactor this
        Object.keys(e.getParameters()).forEach(function (error) {
          this.getModel().setProperty("/newIssueValueState/" + error, sap.ui.core.ValueState.Error);
        }, this);
      }
    });
  });
