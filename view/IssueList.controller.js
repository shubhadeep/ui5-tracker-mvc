/*global sap */
sap.ui.core.mvc.Controller.extend("sap.ui.demo.tracker.view.IssueList", {
  onInit: function () {
    "use strict";
    sap.ui.core.UIComponent.getRouterFor(this)
                           .attachRouteMatched(this.onRouteMatched, this);
  },
  onRouteMatched: function (e) {
    "use strict";
  },
  handleDelete: function (e) {
    "use strict";
    var oList = e.getSource(),
        sPath = e.getParameter("listItem").getBindingContextPath();

    // after deletion put the focus back to the list
    oList.attachEventOnce("updateFinished", oList.focus, oList);

    // send a delete request to the odata service
    this.getView().getModel().remove(sPath, {
      success: this.onDeleteIssueSuccess.bind(this),
      error: this.onDeleteIssueError
    });
  },
  handleIssueItemPress: function (e) {
    "use strict";
    var detailPath = e.getSource().getBindingContextPath();

    sap.ui.core.UIComponent.getRouterFor(this)
                           .navTo("detail", {
                                issueId: this.getIssueIdFromBindingPath(detailPath)
                            });
  },
  handleCreatePress: function (e) {
    "use strict";
    sap.ui.core.UIComponent.getRouterFor(this).navTo("create");
  },
  onDeleteIssueSuccess: function (data, response) {
    "use strict";
    sap.m.MessageToast.show(this.getI18nText("ISSUE_DELETE_SUCCESS_MESSAGE"));
  },
  onDeleteIssueError: function (error) {
    "use strict";
    sap.m.MessageToast.show(this.getI18nText("ISSUE_DELETE_ERROR_MESSAGE"));
  },
  getI18nText: function (key) {
    "use strict";
    return this.getOwnerComponent()
               .getModel("i18n")
               .getResourceBundle()
               .getText(key);
  },
  getIssueIdFromBindingPath: function (bindingPath) {
    "use strict";
    return bindingPath.split("/Issues(")[1].split(")")[0];
  }
});
