"use strict";
const sam_actions_1 = require('../../sam/sam.actions');
class RocketActions extends sam_actions_1.Actions {
    constructor(model) {
        super(model);
        this.model = model;
    }
    init() {
        this.model.present({});
    }
    display() {
        this.model.present({});
        return false;
    }
    start(data, present) {
        data.started = true;
        this.model.present(data);
        return false;
    }
    decrement(data, present) {
        present = present || this.model.present;
        data = data || {};
        data.counter = data.counter || 3;
        var d = data;
        var m = this.model;
        setTimeout(function () {
            d.counter = d.counter - 1;
            m.present(d);
        }, 1000);
    }
    launch(data, present) {
        present = present || this.model.present;
        data.launched = true;
        this.model.present(data);
        return false;
    }
    abort(data, present) {
        present = present || this.model.present;
        data.aborted = true;
        this.model.present(data);
        return false;
    }
}
exports.RocketActions = RocketActions;
//# sourceMappingURL=rocket.actions.js.map