import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


import * as firebase from 'firebase';


/**
 * Generated class for the VideosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html',
})
export class VideosPage {

  public videos = [];
  public likes;
  public currentUser: any;
  public state: any;
  public path: any;
  public database: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {
    this.currentUser = firebase.auth().currentUser;
    this.database = firebase.database();
    this.navParams.get('video').data.map((data, index) => {
      this.videos.push({ data, index })
    })
  }

  likeButton = item => {
    this.setState(item);
    if (this.state) {
      this.displayAlert('Warning', 'You Have Already Liked this Video')
    } else {
      this.addToList(item);
    }
  }

  addToList = item => {
    this.path = this.navParams.get('video').path + "/" + item.index + "/likes/"
    var upload = this.database.ref(this.path).push();
    upload.set({uid:this.currentUser.uid});
    console.log(this.path)
    console.log(item.data)
    this.likes = item.data.likes;
    this.likes.push({uid:this.currentUser.uid})
  }

  setState = item => {
    item.data.likes.map((likes, index) => {
      if (likes.uid == this.currentUser.uid) {
        this.state = true;
        return true;
      } else {
        this.state = false;
      }
    })
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
