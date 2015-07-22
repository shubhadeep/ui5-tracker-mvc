/*global sap */
sap.ui.define(
  ["sap/ui/demo/tracker/base/Controller",
   "sap/ui/demo/tracker/util/Utility",
   "sap/ui/model/json/JSONModel",
   "sap/m/MessageBox"],
  function (Controller, Utility, JSONModel, MessageBox) {
    "use strict";

    var controller = Controller.extend("sap.ui.demo.tracker.view.IssueDetail", {

      onInit: function () {
        this.getRouter()
            .getRoute("detail")
            .attachMatched(this.onRouteMatched, this);

        this.getView()
            .setModel(new JSONModel({}), "detail");
      },

      onRouteMatched: function (e) {
        var routeParameters = e.getParameters(),
            issueBindingPath,
            view,
            issueId;

        view = this.getView();
        issueId = routeParameters.arguments.issueId;
        issueBindingPath = view.getModel()
                               .getBindingPathById(issueId);

        view.getModel()
            .read(issueBindingPath, {
              success: this.onIssueDataLoaded.bind(this),
              error: this.onIssueDataLoadFailed.bind(this)
            });
      },

      handleEditPress: function (e) {
        var issuePath = e.getSource()
                         .getBindingContext()
                         .getPath(),
            issueId = this.getView()
                          .getModel()
                          .getIdByBindingPath(issuePath);

        this.getRouter()
            .navTo("edit", {
              issueId: issueId
            });
      },

      handleDeletePress: function (e) {
        var issuePath = e.getSource()
                         .getBindingContext()
                         .getPath();

        this.deleteIssue(issuePath);
      },

      onIssueDataLoaded: function (data) {
        this.getView()
            .getModel("detail")
            .setProperty("/", data);
      },

      onIssueDataLoadFailed: function (error) {
        MessageBox.error(this.getI18nText("ISSUE_DETAIL_LOAD_FAIL"), {
          onClose: this.goToList.bind(this) 
          }
        );
      },

      goToList: function () {
        this.getRouter()
            .navTo("list");
      },

      deleteIssue: function (issueContextPath) {
        var model = this.getView()
                        .getModel();

        // send a delete request to the odata service
        model.remove(issueContextPath, {
          success: this.onIssueDeleted.bind(this),
          error: this.showBackendError
        });
      },

      onIssueDeleted: function () {
        var message = this.getI18nText("ISSUE_DELETE_SUCCESS_MESSAGE");

        this.getRouter()
            .navTo("list");

        Utility.displayMessageToast(message);
      }
    });

    return controller;
  }, true /*export*/);
