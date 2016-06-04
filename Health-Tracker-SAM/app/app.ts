import {App, Platform, Alert} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {
    FIREBASE_PROVIDERS, defaultFirebase,
    AngularFire, firebaseAuthConfig, AuthProviders,
    AuthMethods
} from 'angularfire2';

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [
      FIREBASE_PROVIDERS,
      defaultFirebase('https://brilliant-inferno-5052.firebaseio.com/'),
      firebaseAuthConfig({
          provider: AuthProviders.Password,
          method: AuthMethods.Password,
          remember: 'default',
          scope: ['email', 'profile']
      })
  ],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  rootPage: any = TabsPage;
  public blog: any;

  constructor(private platform: Platform) {

    platform.ready().then(() => {
          this.registerBackButtonListener();
      });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
        StatusBar.styleDefault();
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
      let confirm = Alert.create({
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
}
