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
const sam_model_1 = require('../../sam/sam.model');
const settings_state_1 = require('./settings.state');
const database_service_1 = require('../../services/database.service');
const _ = require('underscore');
(function (ItemType) {
    ItemType[ItemType["Number"] = 0] = "Number";
    ItemType[ItemType["Miles"] = 1] = "Miles";
    ItemType[ItemType["Kilometers"] = 2] = "Kilometers";
    ItemType[ItemType["Reps"] = 3] = "Reps";
    ItemType[ItemType["Text"] = 4] = "Text";
})(exports.ItemType || (exports.ItemType = {}));
var ItemType = exports.ItemType;
;
let SettingsModel = class SettingsModel extends sam_model_1.Model {
    constructor(state, service) {
        super(state, service);
        this.state = state;
        this.service = service;
        this.defaultSettings = {
            calendar: "c1",
            sheet: "s1",
            trackerTypes: [
                { itemName: "treadmill", itemType: ItemType.Miles },
                { itemName: "rowing", itemType: ItemType.Kilometers },
                { itemName: "lunges", itemType: ItemType.Reps }
            ]
        };
    }
    init() {
        this.settingsData = this.defaultSettings;
        this.settingsData.displayName = "???";
        // load settings from database
        console.log("loading settings");
        this.service.getValue('settings')
            .subscribe((data) => {
            if (data) {
                console.log("settings new data=" + JSON.stringify(data));
                this.settingsData = _.extend(this.settingsData, data);
            }
            this.state.render(this);
        }, error => { console.log("settings getAll error=" + error); }, () => { console.log('Get all settings complete'); });
    }
    writeSettings(data) {
        console.log("writeSettings " + JSON.stringify(data));
        this.service.create('settings', this.settingsData);
    }
    present(data) {
        console.log("present settings: " + JSON.stringify(data));
        if (data) {
            this.settingsData = data || this.settingsData;
            this.settingsData.displayName = this.service.getUsername();
            this.writeSettings(data);
        }
        this.state.render(this);
    }
};
SettingsModel = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [settings_state_1.SettingsState, database_service_1.DatabaseService])
], SettingsModel);
exports.SettingsModel = SettingsModel;
//# sourceMappingURL=settings.model.js.map