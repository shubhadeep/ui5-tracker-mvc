sap.ui.core.mvc.Controller.extend("sap.ui.demo.tracker.view.IssueList", {
  handleDelete: function (event) {
    var oList = event.getSource(),
        sPath = event.getParameter("listItem").getBindingContext().getPath();

    // after deletion put the focus back to the list
    oList.attachEventOnce("updateFinished", oList.focus, oList);

    // send a delete request to the odata service
    this.getView().getModel().remove(sPath);
  }
});