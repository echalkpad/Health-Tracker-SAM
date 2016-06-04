"use strict";
const sam_actions_1 = require('../../sam/sam.actions');
class SettingsActions extends sam_actions_1.Actions {
    constructor(model) {
        super(model);
        this.model = model;
        this.save = function (data) {
            console.log('saving ' + JSON.stringify(data));
            this.present(data);
            return false;
        };
    }
    init() {
        //this.model.present({});
    }
}
exports.SettingsActions = SettingsActions;
//# sourceMappingURL=settings.actions.js.map