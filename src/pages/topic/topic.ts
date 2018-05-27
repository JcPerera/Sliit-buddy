import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';

import { SubtopicsPage } from "../subtopics/subtopics";
import { AddTopicPage } from "../add-topic/add-topic";

/**
 * Generated class for the TopicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-topic',
  templateUrl: 'topic.html',
})
export class TopicPage {

  public data;
  public topics = [];
  public subtopics;
  public userId: any;
  public userDb: any;
  public type: any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = this.navParams.get("topics");
    this.userId = firebase.auth().currentUser.uid;
    this.userDb = firebase.database().ref('users')
    this.getUserInfo();    
    this.subtopics = this.data.sub[this.data.top];
    Object.keys(this.data.sub[this.data.top]).map((k)=>{
    this.topics.push(k);
    })
  }

  goToSubtopic(data){
    this.navCtrl.push(SubtopicsPage, {
      subtopics : {
        topic : data,
        info: this.subtopics,
        path: this.data.path+"/"+data
      }
    })
  }

  getUserInfo = () => {
    this.type = this.userDb.child(this.userId).once('value').then(k => {
      this.type = k.val().loggedAs;
    })
  }

  checkUser = () => {
    if (this.type == "instructor") {
      return true;
    } else {
      return false;
    }
  }

  goToAddTopic() {
    this.navCtrl.push(AddTopicPage, {
      path: this.navParams.get('topics').path
    })
  }
  
}
