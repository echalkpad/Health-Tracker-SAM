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
const rocket_exports_1 = require('./rocket.exports');
const database_service_1 = require('../../services/database.service');
const auth_service_1 = require('../../services/auth.service');
const angularfire2_1 = require('angularfire2');
let RocketComponent = class RocketComponent extends rocket_exports_1.Sam {
    constructor(loader, elementRef, fbAuth) {
        super(rocket_exports_1.RocketActions, rocket_exports_1.RocketModel, rocket_exports_1.RocketState, rocket_exports_1.RocketViews, database_service_1.DatabaseService, auth_service_1.AuthService);
        this.loader = loader;
        this.elementRef = elementRef;
        this.fbAuth = fbAuth;
    }
    ngOnInit() {
        this.actions.init();
        this.auth.auth = this.fbAuth;
        this.auth.init();
        this.model.init('/rocket', ''); // load data
        this.views.updated.subscribe((representation) => {
            // Not sure how efficient this is at replacing the DOM. Gut tells me it's expensive.
            // Could create a single view/template with ngIfs and a ViewModel that it would bind to.
            // ViewModel properties would update based on state
            // angular rc breaks loadIntoLocation - need this:
            //@ViewChild(‘myVar’, {read: ViewContainerRef}) to get hold of a ViewContainerRef at an element with variable myVar. 
            // Then call DynamicComponentLoader.loadNextToLocation
            if (this.component == undefined || this.component.componentType.name !== representation.name) {
                //this.loader.loadIntoLocation(representation, this.elementRef, 'rocket').then((component) => {
                this.loader.loadNextToLocation(representation, this.rocket).then((component) => {
                    if (this.component) {
                        this.component.destroy();
                    }
                    component.instance.rocket = this;
                    this.component = component;
                });
            }
        });
        this.views.updated.subscribe((representation) => {
            if (this.state.launched(this.model)) {
            }
        });
        this.views.updated.next(this.views.representation);
    }
};
__decorate([
    rocket_exports_1.ViewChild('rocket', { read: rocket_exports_1.ViewContainerRef }), 
    __metadata('design:type', Object)
], RocketComponent.prototype, "rocket", void 0);
RocketComponent = __decorate([
    rocket_exports_1.Component({
        selector: 'rocket',
        templateUrl: 'build/pages/rocket/rocket.template.html'
    }), 
    __metadata('design:paramtypes', [rocket_exports_1.DynamicComponentLoader, rocket_exports_1.ElementRef, angularfire2_1.FirebaseAuth])
], RocketComponent);
exports.RocketComponent = RocketComponent;
//# sourceMappingURL=rocket.component.js.map