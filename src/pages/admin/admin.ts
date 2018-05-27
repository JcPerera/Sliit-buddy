import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { ModalPage } from '../modal/modal';

import * as firebase from 'firebase';
/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  public database: any;
  public videos = []

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams) {
    try {
      this.database = firebase.database().ref(this.navParams.get('video').path);
      this.database.on('value', snap => {
        console.log(snap.val())
        let data = snap.val();
        if (data) {
          this.videos = [];
          Object.keys(data).map(k => {
            this.videos.push({
              key: k,
              name: data[k].name,
              video: data[k].video
            })
          })
        } else {
          this.videos = [];
        }
      })
      console.log(this.videos);
    } catch{
      this.videos = [];
    }
  }

  presentModal() {
    let modal = this.modalCtrl.create(ModalPage, {
      path: this.navParams.get('video').path
    });
    modal.present();
  }

  delete = (item) => {
    this.database.child(item).remove();
  }
}
