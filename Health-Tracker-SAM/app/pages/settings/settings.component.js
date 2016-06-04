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
const settings_exports_1 = require('./settings.exports');
const ionic_angular_1 = require('ionic-angular');
const common_1 = require('@angular/common');
const database_service_1 = require('../../services/database.service');
const auth_service_1 = require('../../services/auth.service');
const angularfire2_1 = require('angularfire2');
let SettingsComponent = class SettingsComponent extends settings_exports_1.Sam {
    constructor(loader, elementRef, fbAuth) {
        super(settings_exports_1.SettingsActions, settings_exports_1.SettingsModel, settings_exports_1.SettingsState, settings_exports_1.SettingsViews, database_service_1.DatabaseService, auth_service_1.AuthService);
        this.loader = loader;
        this.elementRef = elementRef;
        this.fbAuth = fbAuth;
    }
    ngOnInit() {
        this.actions.init();
        this.auth.auth = this.fbAuth;
        this.auth.init();
        this.model.init(); // load data
        this.views.updated.subscribe((representation) => {
            // Not sure how efficient this is at replacing the DOM. Gut tells me it's expensive.
            // Could create a single view/template with ngIfs and a ViewModel that it would bind to.
            // ViewModel properties would update based on state.
            if (representation) {
                this.loader.loadNextToLocation(representation, this.settings).then((component) => {
                    if (this.component) {
                        this.component.destroy();
                    }
                    if (component && component.instance) {
                        component.instance.settings = this;
                        this.component = component;
                    }
                });
            }
        });
        this.views.updated.next(this.views.representation);
    }
};
__decorate([
    settings_exports_1.ViewChild('settings', { read: settings_exports_1.ViewContainerRef }), 
    __metadata('design:type', Object)
], SettingsComponent.prototype, "settings", void 0);
SettingsComponent = __decorate([
    settings_exports_1.Component({
        selector: 'settings',
        templateUrl: 'build/pages/settings/settings.template.html',
        directives: [ionic_angular_1.IONIC_DIRECTIVES, common_1.FORM_DIRECTIVES]
    }), 
    __metadata('design:paramtypes', [settings_exports_1.DynamicComponentLoader, settings_exports_1.ElementRef, angularfire2_1.FirebaseAuth])
], SettingsComponent);
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=settings.component.js.map