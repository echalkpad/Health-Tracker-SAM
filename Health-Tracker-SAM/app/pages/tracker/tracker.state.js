"use strict";
const sam_state_1 = require('../../sam/sam.state');
class TrackerState extends sam_state_1.State {
    constructor(views, actions) {
        super(views, actions);
        this.views = views;
        this.actions = actions;
    }
    ready(model) {
        return (true);
    }
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
    // Next action predicate, derives whether
    // the system is in a (control) state where
    // a new (next) action needs to be invoked
    nextAction(model) { }
    ;
}
exports.TrackerState = TrackerState;
//# sourceMappingURL=tracker.state.js.map