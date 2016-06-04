"use strict";
class Sam {
    constructor(_actions, _model, _state, _views, _service, _auth) {
        this.actions = new _actions(this.model);
        this.model = new _model(this.state);
        this.state = new _state(this.views, this.actions);
        this.views = new _views();
        this.service = new _service();
        this.auth = new _auth;
        // injection dependencies SAM
        this.actions.model = this.model;
        this.model.state = this.state;
        this.state.views = this.views;
        this.state.actions = this.actions;
        this.model.service = this.service;
        this.service.auth = this.auth;
    }
}
exports.Sam = Sam;
//# sourceMappingURL=sam.component.js.map