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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
const ionic_angular_1 = require('ionic-angular');
const core_1 = require('@angular/core');
const angularfire2_1 = require('angularfire2');
const login_1 = require('../login/login');
require('rxjs');
const angularfire2_2 = require('angularfire2');
let Home = class Home {
    constructor(ref, af, auth, navCtrl) {
        this.ref = ref;
        this.af = af;
        this.auth = auth;
        this.navCtrl = navCtrl;
    }
    ngOnInit() {
        // subscribe to the auth object to check for the login status
        // of the user, if logged in, save some user information and
        // execute the firebase query...
        // .. otherwise
        // show the login modal page
        this.auth.subscribe((data) => {
            console.log("in home auth subscribe ", JSON.stringify(data));
            if (data) {
                if (data.twitter) {
                    this.authInfo = data.twitter;
                    this.authInfo.displayName = data.twitter.displayName;
                }
                else if (data.github) {
                    this.authInfo = data.github;
                    this.authInfo.displayName = data.github.displayName;
                }
                else if (data.google) {
                    this.authInfo = data.google;
                    this.authInfo.displayName = data.google.displayName;
                }
                else {
                    this.authInfo = data.password;
                    this.authInfo.displayName = data.password.email;
                }
                this.authInfo.uid = data.uid;
            }
            else {
                this.authInfo = null;
                this.displayLoginModal();
            }
        });
    }
    /**
     * displays the login window
     */
    displayLoginModal() {
        let loginPage = ionic_angular_1.Modal.create(login_1.LoginPage);
        this.navCtrl.present(loginPage);
    }
    /**
     * logs out the current user
     */
    logoutClicked() {
        if (this.authInfo && (this.authInfo.email || this.authInfo.accessToken)) {
            this.auth.logout();
            return;
        }
    }
};
Home = __decorate([
    ionic_angular_1.Page({
        templateUrl: 'build/pages/home/home.html',
    }),
    __param(0, core_1.Inject(angularfire2_2.FirebaseRef)), 
    __metadata('design:paramtypes', [Firebase, angularfire2_1.AngularFire, angularfire2_2.FirebaseAuth, ionic_angular_1.NavController])
], Home);
exports.Home = Home;
//# sourceMappingURL=home.js.map