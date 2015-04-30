/*global jQuery, sap*/
jQuery.sap.declare("sap.ui.demo.tracker.model.IssueModel");

sap.ui.model.odata.v2.ODataModel.extend("sap.ui.demo.tracker.model.IssueModel", {
  getEntitySetPath: function () {
    "use strict";
    return "/Issues";
  },
  getIdByBindingPath: function (bindingPath) {
    "use strict";
    var parts = bindingPath.split("(");
    if (parts.length > 1) {
      return parts[1];
    }
    return "";
  },
  createNew: function () {
    "use strict";
    var newArgs = [this.getEntitySetPath()].concat(Array.prototype.slice.call(arguments));
    return this.create.apply(this, newArgs);
  }
});
