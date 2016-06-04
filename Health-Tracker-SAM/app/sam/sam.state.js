"use strict";
class State {
    constructor(views, actions) {
        this.views = views;
        this.actions = actions;
    }
    representation(model) {
        var representation = 'oops... something went wrong, the system is in an invalid state';
        this.views.display(representation);
    }
    next(model) {
    }
    render(model) {
        this.representation(model);
        this.next(model);
    }
}
exports.State = State;
//# sourceMappingURL=sam.state.js.map