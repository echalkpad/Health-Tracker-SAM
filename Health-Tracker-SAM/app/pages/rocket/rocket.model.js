"use strict";
const sam_model_1 = require('../../sam/sam.model');
exports.COUNTER_MAX = 3;
class RocketModel extends sam_model_1.Model {
    constructor(state, _service) {
        super(state, _service);
        this.state = state;
        this._service = _service;
        this.counter = exports.COUNTER_MAX;
        this.started = false;
        this.launched = false;
        this.aborted = false;
    }
    init(root, uid) {
    }
    present(data) {
        console.log("present : " + data);
        if (this.state.counting(this)) {
            if (this.counter === 0) {
                this.launched = data.launched || false;
            }
            else {
                this.aborted = data.aborted || false;
                if (data.counter !== undefined) {
                    this.counter = data.counter;
                }
            }
        }
        else {
            if (this.state.ready(this)) {
                this.started = data.started || false;
            }
        }
        this.state.render(this);
        //super.render(this);
    }
}
exports.RocketModel = RocketModel;
//# sourceMappingURL=rocket.model.js.map