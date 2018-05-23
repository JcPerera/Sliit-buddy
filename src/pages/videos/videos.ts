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
    this.getLikeData(item);
  }

  addToList = item => {
    this.path = this.navParams.get('video').path + "/" + item.index + "/likes/"
    var upload = this.database.ref(this.path).push();
    upload.set({ uid: this.currentUser.uid });
    console.log(this.path)

  }

  setState = (item) => {
    if(item){
      Object.values(item).map((k)=>{
        if(k.uid == this.currentUser.uid){
          this.state = true;
          return;
        }else{
          this.state = false;
        }
      })
    }else{
      this.state = false
    }
    
    console.log(this.state);
  }

  getLikeData = item => {
    let url = this.navParams.get('video').path + "/" + item.index + "/likes/"
    this.database.ref(url).once('value', snap => {
      this.setState(snap.val())
      if(this.state == true){
        console.log('already liked')
      }else{
        this.addToList(item);
      }
    });
  }
}
