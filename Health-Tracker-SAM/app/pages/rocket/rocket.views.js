"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const sam_views_1 = require('../../sam/sam.views');
let Redify = class Redify {
    constructor(_element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
        _renderer.setElementStyle(_element, 'color', 'red');
    }
};
Redify = __decorate([
    core_1.Directive({
        selector: '[redify]'
    }), 
    __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
], Redify);
exports.Redify = Redify;
class RocketViews extends sam_views_1.Views {
    constructor() {
        super();
        this.updated = new core_1.EventEmitter();
    }
    init(model) {
        this.ready(model);
    }
    display(representation) {
        this.representation = representation;
        this.updated.emit(representation);
    }
    // State representation of the ready state
    ready(model) {
        let Ready = class Ready {
        };
        Ready = __decorate([
            core_1.Component({
                selector: 'ready',
                directives: [Redify],
                template: `
            <p>Counter: {{rocket.model.counter}}</p>
            <form (ngSubmit)="rocket.actions.start({})">
                <input type="submit" value="Start">
            </form>`
            }), 
            __metadata('design:paramtypes', [])
        ], Ready);
        return Ready;
    }
    // State representation of the counting state
    counting(model) {
        let Counting = class Counting {
        };
        Counting = __decorate([
            core_1.Component({
                selector: 'counting',
                template: `
            <p>Count down: {{rocket.model.counter}}</p>
            <form (ngSubmit)="rocket.actions.abort({})">
                <input type="submit" value="Abort">
            </form>`,
            }), 
            __metadata('design:paramtypes', [])
        ], Counting);
        return Counting;
    }
    // State representation of the aborted state
    aborted(model) {
        let Aborted = class Aborted {
        };
        Aborted = __decorate([
            core_1.Component({
                selector: 'aborted',
                template: `<p>Aborted at counter: {{rocket.model.counter}}</p>`
            }), 
            __metadata('design:paramtypes', [])
        ], Aborted);
        return Aborted;
    }
    // State representation of the launched state
    launched(model) {
        let Launched = class Launched {
        };
        Launched = __decorate([
            core_1.Component({
                selector: 'launched',
                template: `<p>Launched</p>`
            }), 
            __metadata('design:paramtypes', [])
        ], Launched);
        return Launched;
    }
}
__decorate([
    core_1.Output(), 
    __metadata('design:type', core_1.EventEmitter)
], RocketViews.prototype, "updated", void 0);
exports.RocketViews = RocketViews;
//# sourceMappingURL=rocket.views.js.map