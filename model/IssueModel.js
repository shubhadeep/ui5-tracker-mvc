/*global jQuery, sap*/
jQuery.sap.declare("sap.ui.demo.tracker.model.IssueModel");

sap.ui.model.odata.v2.ODataModel.extend("sap.ui.demo.tracker.model.IssueModel", {
  getEntitySetPath: function () {
    "use strict";

    return "/Issues";
  },
  createNew: function () {
    "use strict";

    var oldArgs = Array.prototype.slice.call(arguments),
        newArgs = [this.getEntitySetPath()].concat(oldArgs);

    return this.create.apply(this, newArgs);
  },
  getIdByBindingPath: function (bindingPath) {
    "use strict";

    var parts = bindingPath.split("(");

    if (parts.length > 1) {
      return parts[1].split(")")[0];
    }

    return "";
  },
  getBindingPathById: function (id) {
    "use strict";

    if (id && id.toString().trim().length > 0) {
      return jQuery.sap.formatMessage("{0}({1})", [this.getEntitySetPath(), id]);
    }

    return "";
  }
});
