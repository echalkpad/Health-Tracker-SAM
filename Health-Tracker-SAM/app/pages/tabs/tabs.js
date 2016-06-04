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
const ionic_angular_1 = require('ionic-angular');
const home_1 = require('../home/home');
const settings_component_1 = require('../settings/settings.component');
const tracker_component_1 = require('../tracker/tracker.component');
const blog_component_1 = require('../blog/blog.component');
let TabsPage = class TabsPage {
    constructor() {
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tab1Root = home_1.Home;
        this.tab2Root = settings_component_1.SettingsComponent;
        this.tab3Root = tracker_component_1.TrackerComponent;
        this.tab4Root = blog_component_1.BlogComponent;
    }
};
TabsPage = __decorate([
    ionic_angular_1.Page({
        templateUrl: 'build/pages/tabs/tabs.html'
    }), 
    __metadata('design:paramtypes', [])
], TabsPage);
exports.TabsPage = TabsPage;
//# sourceMappingURL=tabs.js.map