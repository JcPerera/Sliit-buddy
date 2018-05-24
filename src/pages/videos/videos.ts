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
  public currentUser: any;
  public database: any;
  public data: any;
  public myLike: any;
  public key: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {
    this.currentUser = firebase.auth().currentUser.uid;
    this.database = firebase.database().ref(this.navParams.get('video').path);
    this.database.on('value', snap => {
      this.data = snap.val();
      let data = snap.val();
      if (data) {
        this.videos = [];
        Object.keys(data).map(k => {
          let likes = null
          let comments = null
          try {
            likes = Object.keys(data[k].likes).length
          } catch{
            likes = 0
          }
          try {
            comments = Object.keys(data[k].comments).length
          } catch{
            comments = 0
          }

          this.videos.push({
            key: k,
            name: data[k].name,
            video: data[k].video,
            like: likes,
            comments: comments
          })
        })
      } else {
        this.navCtrl.pop();
      }
    })
    console.log(this.videos);
  }

  likeButton = item => {
    this.checkLikeStatus(item);
    if (this.myLike == true) {
      this.database.child(item + "/likes/" + this.key).remove();
    } else {
      this.database.child(item + "/likes").push({
        uid: this.currentUser
      })
    }

  }

  checkLikeStatus = (item) => {
    this.myLike = false;
    let likes = this.data[item].likes
    try {
      Object.keys(likes).map((k) => {
        if (likes[k].uid == this.currentUser) {
          this.key = k;
          this.myLike = true
        } else {
          console.log('else')
        }
      })
    } catch{
      console.log('catch')
    }
  }
}
