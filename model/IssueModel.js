/*global jQuery, sap*/
jQuery.sap.declare("sap.ui.demo.tracker.model.IssueModel");

sap.ui.model.odata.v2.ODataModel.extend("sap.ui.demo.tracker.model.IssueModel", {
  getIssueIdByBindingPath: function (bindingPath) {
    "use strict";
    return bindingPath.split("/Issues(")[1].split(")")[0];
  },
  getEntitySetPath: function () {
    "use strict";
    return "/Issues";
  }
});
