"use strict";
const sam_state_1 = require('../../sam/sam.state'); // SAM model
class SettingsState extends sam_state_1.State {
    constructor(views, actions) {
        super(views, actions);
        this.views = views;
        this.actions = actions;
        this.calendar = function (model) {
            return model.settings.calendar;
        };
        this.sheet = function (model) {
            return model.settings.sheet;
        };
    }
    ready(model) {
        return (true);
    }
    // Next action predicate, derives whether
    // the system is in a (control) state where
    // a new (next) action needs to be invoked
    nextAction(model) { }
    ;
    representation(model) {
        var representation = {};
        if (this.ready(model)) {
            representation = this.views.ready(model);
        }
        this.views.display(representation);
    }
    next(model) {
    }
    redner(model) {
        //super.render(model);
        this.representation(model);
        this.next(model);
    }
}
exports.SettingsState = SettingsState;
//# sourceMappingURL=settings.state.js.map