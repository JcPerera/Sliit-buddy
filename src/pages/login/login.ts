import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { GooglePlus } from "@ionic-native/google-plus";
import * as firebase from 'firebase';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public fireAuth: any;
  public userProfile: any;
  user;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public gplus: GooglePlus,
    public platform: Platform
  ) {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('users');
    this.user = this.fireAuth.currentUser;
    console.log(this.user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login = () => {
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
  }

  async nativeGoogleLogin(): Promise<void> {
    try {
      const gplusUser = await this.gplus.login({
        'webClientId': '872519563666-3lcrq815fdf308oo489jm3g21nmjp3vt.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })

      return await this.fireAuth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      )
    } catch (err) {
      console.log(err);
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.fireAuth.signInWithPopup(provider);


      this.userProfile.child(credential.user.uid).set({
        email: credential.user.email,
        username: credential.user.displayName,
        photo: credential.user.photoURL
      }).then(() => {

      }, error => {
        console.log(error);
      })
    } catch (err) {
      console.log(err);
    }
  }

}
