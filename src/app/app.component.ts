import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";

import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyB9NQm2hPgD8ZLkTnCiiu_lvk8HbnPLrQI",
  authDomain: "cpmad-5f5e3.firebaseapp.com",
  databaseURL: "https://cpmad-5f5e3.firebaseio.com",
  projectId: "cpmad-5f5e3",
  storageBucket: "cpmad-5f5e3.appspot.com",
  messagingSenderId: "872519563666"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  //zone: NgZone;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp(config);
    //this.zone = new NgZone({});
    firebase.auth().onAuthStateChanged((user) => {
      //this.zone.run(() => {
        if (!user) {
          console.log("No user");
          this.rootPage = LoginPage;
        } else {
          console.log("user logged in");
          this.rootPage = HomePage;
        }
    //  });
    })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

