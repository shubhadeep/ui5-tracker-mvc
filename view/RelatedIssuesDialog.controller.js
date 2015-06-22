/*global sap */
sap.ui.define(
  ["sap/ui/demo/tracker/base/Controller",
  "sap/ui/demo/tracker/model/IssueModel"],
  function (Controller, IssueModel) {
    "use strict";

    return Controller.extend("sap.ui.demo.tracker.view.RelatedIssuesDialog", {
      onInit: function (e) {
      },
      openDialog: function (searchValue, onSelectionDone) {        
        var dialog = this.byId("idRelatedIssuesSelectDialog");
        this.onSelectionDone = onSelectionDone;

        // TODO: Following shouldnt be required.
        dialog.setModel(this.getView().getModel()); 
        dialog.open(searchValue);
      },
      handleSearch: function (e) {
        // TODO: Make Case Sensetive
        var filter = new sap.ui.model.Filter(
              "Name",
              sap.ui.model.FilterOperator.Contains,
              e.getParameter("value")
        );
        e.getSource()
         .getBinding("items")
         .filter([filter]);
      },
      handleClose: function (e) {
        var selectedContexts = e.getParameter("selectedContexts"),
            selectedIssues,
            opener;

        if (selectedContexts) {
          selectedIssues = selectedContexts.map(function (context) {
            // TODO: Shouldnt require IssueModel here - use utility instead
            return IssueModel.prototype.getIdByBindingPath(context.sPath);
          });
          
          if (typeof this.onSelectionDone === "function") {
            this.onSelectionDone(selectedIssues);  
          }
        }
        e.getSource()
         .getBinding("items")
         .filter([]);
      },
      handleCancel: function (e) {
        e.getSource()
         .getBinding("items")
         .filter([]);
      } 
    });
  });
