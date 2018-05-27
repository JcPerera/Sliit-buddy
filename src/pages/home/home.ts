import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GooglePlus } from "@ionic-native/google-plus";
import { ActionSheetController } from 'ionic-angular';
import * as firebase from 'firebase';

import { SubjectsPage } from "../subjects/subjects";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public fireAuth: any;
  public items = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  constructor(public navCtrl: NavController,
    public gplus: GooglePlus,
    public platform: Platform,
    public actionSheetCtrl: ActionSheetController
  ) {

    this.fireAuth = firebase.auth();
  }

  signOut() {
    this.fireAuth.signOut();
    if (this.platform.is('cordova')) {
      this.gplus.logout().catch(k => {
        console.log(k);
      });
    }
  }

  presentActionSheet(item: string) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Your Semester',
      buttons: [
        {
          text: '1st Semester',
          handler: () => {
            this.navCtrl.push(SubjectsPage, {
              yearNsem: {
                year: item,
                semester: 1
              }
            });
            console.log(item + ' Semester 1 clicked');
          }
        }, {
          text: '2nd Semester',
          handler: () => {
            this.navCtrl.push(SubjectsPage, {
              yearNsem: {
                year: item,
                semester: 2
              }
            });
            console.log(item + ' Semester 2 clicked');
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
