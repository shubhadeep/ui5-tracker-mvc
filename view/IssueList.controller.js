sap.ui.core.mvc.Controller.extend("sap.ui.demo.tracker.view.IssueList", {
  handleDelete: function (e) {
    var oList = e.getSource(),
        sPath = e.getParameter("listItem").getBindingContext().getPath();

    // after deletion put the focus back to the list
    oList.attachEventOnce("updateFinished", oList.focus, oList);

    // send a delete request to the odata service
    this.getView().getModel().remove(sPath, {
      success: this.onDeleteIssueSuccess,
      error: this.onDeleteIssueError
    });
  },
  onDeleteIssueSuccess: function (data, response) {
    sap.m.MessageToast.show("Deleted");
  },
  onDeleteIssueError: function (error) {
    sap.m.MessageToast.show("Error");
  }
});