/*global sap */
jQuery.sap.require("sap.ui.demo.tracker.base.Controller");

sap.ui.demo.tracker.base.Controller.extend("sap.ui.demo.tracker.view.IssueList", {
  onInit: function () {
    "use strict";

    this.getRouter()
        .attachRouteMatched(this.onRouteMatched, this);
  },
  onRouteMatched: function (e) {
    "use strict";

    return;
  },
  handleDelete: function (e) {
    "use strict";

    var oList = e.getSource(),
        sPath = e.getParameter("listItem").getBindingContextPath();

    // after deletion put the focus back to the list
    oList.attachEventOnce("updateFinished", oList.focus, oList);
    this.deleteIssue(sPath);

  },
  deleteIssue: function (issueContextPath) {
    "use strict";

    this.getView()
        .getModel()
        .remove(issueContextPath, {
          success: this.onIssueDeleted.bind(this),
          error: this.showBackendError
        });
  },
  handleCreatePress: function (e) {
    "use strict";

    this.getRouter()
        .navTo("create");
  },
  handleIssueItemPress: function (e) {
    "use strict";

    var detailPath = e.getSource()
                      .getBindingContextPath(),
        issueId = this.getView()
                      .getModel()
                      .getIdByBindingPath(detailPath);

    this.getRouter()
        .navTo("detail", {
          issueId: issueId
        });
  },
  onIssueDeleted: function (data, response) {
    "use strict";

    var message = this.getI18nText("ISSUE_DELETE_SUCCESS_MESSAGE");

    this.showMessageToast(message);
  }
});
