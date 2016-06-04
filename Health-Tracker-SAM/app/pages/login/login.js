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
let LoginPage = class LoginPage {
    constructor(auth, ref, viewCtrl) {
        this.auth = auth;
        this.ref = ref;
        this.viewCtrl = viewCtrl;
    }
    /**
     * this will dismiss the modal page
     */
    dismiss() {
        this.viewCtrl.dismiss();
    }
    /**
     * this creates the user using the form credentials.
     *
     * we are preventing the default behavor of submitting the form
     *
     * @param _credentials {Object} the email and password from the form
     * @param _event {Object} the event information from the form submit
     */
    registerUser(_credentials, _event) {
        _event.preventDefault();
        this.auth.createUser(_credentials).then((authData) => {
            console.log(authData);
            _credentials.created = true;
            return this.login(_credentials, _event);
        }).catch((error) => {
            this.error = error;
            console.log(error);
        });
    }
    registerUserWithGoogle(_credentials, _event) {
        _event.preventDefault();
        this.auth.login({
            provider: angularfire2_1.AuthProviders.Google,
            method: angularfire2_1.AuthMethods.Popup
        }).then((value) => {
            console.log("Google login: " + JSON.stringify(value));
            this.dismiss();
        }).catch((error) => {
            this.error = error;
            console.log(error);
        });
    }
    /**
     * this logs in the user using the form credentials.
     *
     * if the user is a new user, then we need to create the user AFTER
     * we have successfully logged in
     *
     * @param _credentials {Object} the email and password from the form
     * @param _event {Object} the event information from the form submit
     */
    login(credentials, _event) {
        _event.preventDefault();
        // if this was called from the register user,  then check if we 
        // need to create the user object or not
        let addUser = credentials.created;
        credentials.created = null;
        // login using the email/password auth provider
        this.auth.login(credentials, {
            provider: angularfire2_1.AuthProviders.Password,
            method: angularfire2_1.AuthMethods.Password
        }).then((authData) => {
            console.log("login: " + JSON.stringify(authData));
            if (addUser) {
                var auth = authData.password;
                return this.ref.child('users')
                    .child(authData.uid)
                    .set({
                    "provider": authData.provider,
                    "avatar": auth.profileImageURL,
                    "displayName": auth.email,
                    "authData": authData
                });
            }
            else {
                this.dismiss();
            }
        }).then((value) => {
            this.dismiss();
        }).catch((error) => {
            this.error = error;
            console.log(error);
        });
    }
};
LoginPage = __decorate([
    ionic_angular_1.Page({
        templateUrl: 'build/pages/login/login.html'
    }),
    __param(1, core_1.Inject(angularfire2_1.FirebaseRef)), 
    __metadata('design:paramtypes', [angularfire2_1.FirebaseAuth, Firebase, ionic_angular_1.ViewController])
], LoginPage);
exports.LoginPage = LoginPage;
//# sourceMappingURL=login.js.map