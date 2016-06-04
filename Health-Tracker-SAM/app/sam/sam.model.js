"use strict";
class Model {
    constructor(state, service) {
        this.state = state;
        this.service = service;
    }
    present(data) {
        this.render(this);
    }
    render(model) {
        this.state.render(model);
    }
}
exports.Model = Model;
//# sourceMappingURL=sam.model.js.map