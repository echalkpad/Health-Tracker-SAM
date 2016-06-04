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
class TrackerViews extends sam_views_1.Views {
    constructor() {
        super();
        this.updated = new core_1.EventEmitter();
    }
    display(representation) {
        this.representation = representation;
        this.updated.emit(representation);
    }
    toComponent(template, directives) {
        let FakeComponent = class FakeComponent {
        };
        FakeComponent = __decorate([
            core_1.Component({ selector: 'tracker', template: template, directives: directives }), 
            __metadata('design:paramtypes', [])
        ], FakeComponent);
        return FakeComponent;
    }
    // State representation of the ready state
    ready(model) {
        let Ready = class Ready {
        };
        Ready = __decorate([
            core_1.Component({
                selector: 'ready',
                directives: [Redify],
                template: '<div #readyContent></div>'
            }), 
            __metadata('design:paramtypes', [])
        ], Ready);
        var readyTemplate = `
            <ion-list class="tracker-item">` +
            model.trackerItems.map(function (e) {
                //console.log("tracker item=" + JSON.stringify(e));
                return (`
                    <ion-item> <h3 class="tracker-item-title" (click)="tracker.actions.edit({date: '` +
                    e.date + `', weight: '` + encodeURI(e.weight) + `', exercise: '` + encodeURI(e.exercise) +
                    `'})" >` + e.date + `
                  </h3>
                    <p class="tracker-item-meta" >` + e.exercise + `</p>
                        <button danger class="tracker-item-delete-button"(click) = "tracker.actions.delete({date: '` + e.date + `'})" > Delete </button>
                    </ion-item>`);
            }) + `
                    <form #postForm="ngForm">
                        <ion-label>Date</ion-label>
                        <ion-datetime #newDate id="tdate" class="form-control" required displayFormat="D-M-YYYY" ngControl="date"></ion-datetime>
                       <ion-label fixed>Notes</ion-label>
                       <ion-input #newNotes id="notes" type="text" class="form-control" required placeholder="Notes" ngControl="notes"></ion-input>
                       <ion-label fixed>Exercise</ion-label>
                       <ion-input #newDesc id="exercise" type="textarea" class="form-control" required placeholder="Exercise" ngControl="exercise"></ion-input>
                       <button id="save" primary (click)="tracker.actions.save(postForm.value)">Save</button>
                     </form>
                </ion-list>
`;
        return this.toComponent(readyTemplate, []);
    }
    ;
}
__decorate([
    core_1.Output(), 
    __metadata('design:type', core_1.EventEmitter)
], TrackerViews.prototype, "updated", void 0);
exports.TrackerViews = TrackerViews;
//# sourceMappingURL=tracker.views.js.map