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

      onRouteMatched: function (event) {
        var routeArguments = event.getParameter("arguments"),
            issueId = routeArguments.issueId,
            view = this.getView(),
            issueBindingPath;

        issueBindingPath = view.getModel()
                               .getBindingPathById(issueId);

        view.getModel()
            .read(issueBindingPath, {
              success: this.onIssueDataLoaded.bind(this),
              error: this.onIssueDataLoadFailed.bind(this)
            });
      },

      handleNavButtonPress: function () {
        this.goToList();
      },

      handleEditPress: function () {
        var issueId = this.getCurrentIssueId();

        this.getRouter()
            .navTo("edit", {
              issueId: issueId
            });
      },

      handleDeletePress: function () {
        var issueId = this.getCurrentIssueId(),
            model = this.getView().getModel(),
            issuePath = model.getBindingPathById(issueId);

        this.deleteIssue(issuePath);
      },

      onIssueDataLoaded: function (data) {
        this.getView()
            .getModel("detail")
            .setProperty("/", data);
      },

      onIssueDataLoadFailed: function (error) {
        MessageBox.error(error.responseText, {
          title: this.getI18nText("ISSUE_DETAIL_LOAD_FAIL"),
          onClose: this.goToList.bind(this)
          }
        );
      },

      getCurrentIssueId: function () {
        var view = this.getView(),
            detailModel = view.getModel("detail");

        return detailModel.getProperty("/ID");
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

        this.goToList();

        Utility.displayMessageToast(message);
      }
    });

    return controller;
  }, true /*export*/);
