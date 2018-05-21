import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { GooglePlus } from "@ionic-native/google-plus";
import * as firebase from 'firebase';
import { LoadingController, AlertController } from 'ionic-angular';
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
  public database: any;
  private loading: any;
  user;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public gplus: GooglePlus,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('users');
    this.database = firebase.database();
    this.user = this.fireAuth.currentUser;
    console.log(this.user);
  }

  login = () => {
    this.displayPreloader('Signing In User');
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

      const credential = await this.fireAuth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      )

      console.log(credential);

      this.userProfile.child(credential.uid).update({
        email: credential.email,
        username: credential.displayName,
        photo: credential.photoURL,
        loggedAs: "student"

      }).then(() => {

      }, error => {
        console.log(error);
      })


    } catch (err) {
      console.log(err);
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.fireAuth.signInWithPopup(provider);

      console.log(credential);
      this.userProfile.child(credential.user.uid).update({
        email: credential.user.email,
        username: credential.user.displayName,
        photo: credential.user.photoURL,
        loggedAs: "student"

      }).then(() => {

      }, error => {
        console.log(error);
      })
    } catch (err) {
      console.log(err);
    }
  }

  instructorLogin = () => {
    this.displayPreloader('Signing In Instructor');
    if (this.platform.is('cordova')) {
      this.nativeIns();
    } else {
      this.webIns();
    }
  }

  async nativeIns() {
    try {
      const gplusUser = await this.gplus.login({
        'webClientId': '872519563666-3lcrq815fdf308oo489jm3g21nmjp3vt.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })

      await this.fireAuth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      ).then((k) => {
        this.database.ref('users/' + k.uid).once('value').then((snapshot) => {
          try {
            if (snapshot.val().type == "instructor") {
              console.log(snapshot.key);
              this.userProfile.child(snapshot.key).update({
                email: k.email,
                username: k.displayName,
                photo: k.photoURL,
                loggedAs: "instructor"
              }).then(() => {
                console.log('You are now logged in as an instructor');
              }), error => {
                console.log(error);
              }
            } else {
              this.fireAuth.signOut();
              this.gplus.logout();
              this.displayAlert('Warning', 'You are not an instructor please login as a student')
            }
          } catch{
            this.fireAuth.signOut();
            this.gplus.logout();
            this.displayAlert('Warning', 'You are not an instructor please login as a student')
          }
        })


        console.log(k)
      })


    } catch (err) {
      console.log(err);
    }
  }

  async webIns() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await this.fireAuth.signInWithPopup(provider).then((k) => {
        this.database.ref('users/' + k.user.uid).once('value').then((snapshot) => {
          try {
            if (snapshot.val().type == "instructor") {
              console.log(snapshot.key);
              this.userProfile.child(snapshot.key).update({
                email: k.user.email,
                username: k.user.displayName,
                photo: k.user.photoURL,
                loggedAs: "instructor"
              }).then(() => {
                console.log('You are now logged in as an instructor');
              }), error => {
                console.log(error);
              }
            } else {
              this.fireAuth.signOut();
              this.displayAlert('Warning', 'You are not an instructor please login as a student')
            }
          } catch{
            this.fireAuth.signOut();
            this.displayAlert('Warning', 'You are not an instructor please login as a student')
          }

        })
      })
    } catch (err) {
      console.log(err);
    }
  }

  displayPreloader(msg: any): void {
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
      content: msg
    });

    this.loading.present();
  }



  hidePreloader(): void {
    this.loading.dismiss();
  }

  displayAlert(title: any, msg: any) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

}
