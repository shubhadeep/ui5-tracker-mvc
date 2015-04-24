/*global sap */
sap.ui.core.mvc.Controller.extend("sap.ui.demo.tracker.view.IssueList", {
  onInit: function () {
    "use strict";
    sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(this.onRouteMatched, this);
  },
  onRouteMatched: function (e) {
    "use strict";
  },
  handleDelete: function (e) {
    "use strict";
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
    "use strict";
    sap.m.MessageToast.show("Deleted");
  },
  onDeleteIssueError: function (error) {
    "use strict";
    sap.m.MessageToast.show("Error");
  }
});
