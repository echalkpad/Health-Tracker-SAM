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
const ionic_native_1 = require('ionic-native');
const tabs_1 = require('./pages/tabs/tabs');
const angularfire2_1 = require('angularfire2');
let MyApp = class MyApp {
    constructor(platform) {
        this.platform = platform;
        this.rootPage = tabs_1.TabsPage;
        platform.ready().then(() => {
            this.registerBackButtonListener();
        });
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            ionic_native_1.StatusBar.styleDefault();
        });
    }
    registerBackButtonListener() {
        document.addEventListener('backbutton', () => {
            var nav = this.getNav();
            if (nav.canGoBack()) {
                nav.pop();
            }
            else {
                this.confirmExitApp(nav);
            }
        });
    }
    confirmExitApp(nav) {
        let confirm = ionic_angular_1.Alert.create({
            title: 'Confirm Exit',
            message: 'Really exit app?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Exit',
                    handler: () => {
                        navigator.app.exitApp();
                    }
                }
            ]
        });
        nav.present(confirm);
    }
    getNav() {
        return navigator.app.getComponent('nav');
    }
};
MyApp = __decorate([
    ionic_angular_1.App({
        template: '<ion-nav [root]="rootPage"></ion-nav>',
        providers: [
            angularfire2_1.FIREBASE_PROVIDERS,
            angularfire2_1.defaultFirebase('https://brilliant-inferno-5052.firebaseio.com/'),
            angularfire2_1.firebaseAuthConfig({
                provider: angularfire2_1.AuthProviders.Password,
                method: angularfire2_1.AuthMethods.Password,
                remember: 'default',
                scope: ['email', 'profile']
            })
        ],
        config: {} // http://ionicframework.com/docs/v2/api/config/Config/
    }), 
    __metadata('design:paramtypes', [ionic_angular_1.Platform])
], MyApp);
exports.MyApp = MyApp;
//# sourceMappingURL=app.js.map