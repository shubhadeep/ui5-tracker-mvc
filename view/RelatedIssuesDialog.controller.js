/*global sap */
sap.ui.define(
  ["sap/ui/demo/tracker/base/Controller"],
  function (Controller) {
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
            selectedIssues;

        if (selectedContexts) {
          selectedIssues = selectedContexts.map(function (context) {
            return context.getProperty("ID");
          });

          if (typeof this.onSelectionDone === "function") {
            this.onSelectionDone(selectedIssues);
          }
        }
        this.resetFilter(e.getSource());
      },
      handleCancel: function (e) {
        this.resetFilter(e.getSource());
      },
      resetFilter: function (control) {
        control.getBinding("items")
               .filter([]);
      }
    });
  });
