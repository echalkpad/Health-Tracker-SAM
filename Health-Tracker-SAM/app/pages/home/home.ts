import {Modal, NavController, Page} from 'ionic-angular';
import {Component, OnInit, Inject} from '@angular/core';
import {AngularFire} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {LoginPage} from '../login/login'
import 'rxjs';
import {FirebaseAuth, AuthProviders, AuthMethods, FirebaseRef } from 'angularfire2';

@Page({
  templateUrl: 'build/pages/home/home.html',
})
export class Home {

    authInfo: any;

    constructor( @Inject(FirebaseRef) public ref: Firebase,
        public af: AngularFire,
        public auth: FirebaseAuth,
        public navCtrl: NavController) {
    }

    ngOnInit() {

        // subscribe to the auth object to check for the login status
        // of the user, if logged in, save some user information and
        // execute the firebase query...
        // .. otherwise
        // show the login modal page
        this.auth.subscribe((data) => {
            console.log("in home auth subscribe ", JSON.stringify(data))
            if (data) {
                if (data.twitter) {
                    this.authInfo = data.twitter;
                    this.authInfo.displayName = data.twitter.displayName;
                } else if (data.github) {
                    this.authInfo = data.github;
                    this.authInfo.displayName = data.github.displayName;
                } else if (data.google) {
                    this.authInfo = data.google;
                    this.authInfo.displayName = data.google.displayName;
                } else {
                    this.authInfo = data.password;
                    this.authInfo.displayName = data.password.email;
                }
                this.authInfo.uid = data.uid;
            } else {
                this.authInfo = null;
                this.displayLoginModal();
            }
        })
    }

    /**
     * displays the login window
     */
    displayLoginModal() {
        let loginPage = Modal.create(LoginPage);
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
}
