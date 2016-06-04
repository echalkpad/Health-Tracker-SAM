"use strict";
const sam_actions_1 = require('../../sam/sam.actions');
class TrackerActions extends sam_actions_1.Actions {
    constructor(model) {
        super(model);
        this.model = model;
        this.edit = function (data) {
            data.lastEdited = data;
            this.present(data);
            return false;
        };
        this.save = function (data) {
            console.log('saving ' + JSON.stringify(data));
            data.item = data;
            data.newItem = true;
            this.present(data);
            return false;
        };
        this.delete = function (data) {
            console.log("tracker delete " + JSON.stringify(data));
            data = { deletedItemKey: data.date };
            this.present(data);
            return false;
        };
        this.cancel = function (data) {
            this.present(data);
            return false;
        };
    }
    init() {
        this.model.present({});
    }
}
exports.TrackerActions = TrackerActions;
//# sourceMappingURL=tracker.actions.js.map