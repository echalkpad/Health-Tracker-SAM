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
class SettingsViews extends sam_views_1.Views {
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
            core_1.Component({ selector: 'settings', template: template, directives: directives }), 
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
        let readyTemplate = `
    <ion-list>Current Settings:
        <ion-item>User name: ` + model.settingsData.displayName + `</ion-item>
        <ion-item>Calendar: ` + model.settingsData.calendar + `</ion-item>
        <ion-item>Sheet: ` + model.settingsData.sheet + `</ion-item>`;
        console.log("view1=" + readyTemplate);
        // loop thru tracker types
        if (model.settingsData.hasOwnProperty("trackerTypes")) {
            for (var item of model.settingsData.trackerTypes) {
                readyTemplate += `<ion-item>Tracker: ` + item.itemName + ` type=` + item.itemType + `</ion-item>`;
            }
        }
        console.log("view2=" + readyTemplate);
        readyTemplate += `</ion-list>
    <ion-list class="settings-form">
        <form #settingsForm="ngForm">
            <ion-label fixed>Calendar</ion-label>
            <ion-input #newCalendar id="calendar" type="text" class="form-control" required placeholder="Calendar name" ngControl="calendar">` +
            model.settingsData.calendar + `</ion-input>
            <ion-label fixed>Sheet name</ion-label>
            <ion-input #newSheet id="sheet" type="text" class="form-control" required placeholder="Sheet name" ngControl="sheet">` +
            model.settingsData.sheet + `</ion-input>
            <button id="save" primary (click)="settings.actions.save(settingsForm.value)">Save</button>
            </form>
     </ion-list>
`;
        console.log("view3=" + readyTemplate);
        return this.toComponent(readyTemplate, []);
    }
    ;
}
__decorate([
    core_1.Output(), 
    __metadata('design:type', core_1.EventEmitter)
], SettingsViews.prototype, "updated", void 0);
exports.SettingsViews = SettingsViews;
//# sourceMappingURL=settings.views.js.map