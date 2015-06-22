/*global sap */
sap.ui.define([],
  function () {
    "use strict";

    return {
      priorityDisplay: function (priorityId) {
        if (!isNaN(parseInt(priorityId))){
          return this.getI18nText("PRIORITY_LEVEL_" + priorityId);
        }
        return this.getI18nText("SELECT_PRIORITY");
      }
    };
  });
