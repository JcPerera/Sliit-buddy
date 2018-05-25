import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as firebase from 'firebase';


/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  public database: any;
  public msg: any;
  public comments = [];
  public currentUser: any;
  public comm: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.currentUser = firebase.auth().currentUser
    console.log(this.navParams.get('path'))
    this.database = firebase.database().ref(this.navParams.get('path') + "/comments")
    this.getData();
    this.msg = {
      content: 'Am I dreaming?',
      position: 'left',
      time: '12/3/2016',
      senderName: 'Gregory'
    }
  }


  getData = () => {
    try{
      this.database.on('value', snapshot => {
        this.comments = [];
        let data = snapshot.val();
        Object.keys(data).map(k => {
          this.comments.push({
            key: k,
            uid: data[k].uid,
            comment: data[k].comment,
            name: data[k].name,
            photo: data[k].photo
          })
        })
      })
    }catch{
      this.comments = [];
    }
    
  }

  sendComment = () => {
    if ((this.comm == "") || this.comm == null) {
      console.log(this.currentUser);
    } else {
      this.database.push({
        uid: this.currentUser.uid,
        comment: this.comm,
        name: this.currentUser.displayName,
        photo: this.currentUser.photoURL
      })
    }
  }


}
