import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VideosPage } from "../videos/videos";
import { AdminPage } from "../admin/admin";
import { AddSubtopicPage } from "../add-subtopic/add-subtopic";
import * as firebase from 'firebase';


/**
 * Generated class for the SubtopicsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subtopics',
  templateUrl: 'subtopics.html',
})
export class SubtopicsPage {
  public data: any;
  public subtopics = [];
  public userId: any;
  public userDb: any;
  public type: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.userId = firebase.auth().currentUser.uid;
    this.userDb = firebase.database().ref('users')
    this.getUserInfo();
    this.data = this.navParams.get("subtopics")
    //Since this is an array (not an object)
    //this.subtopics=[...this.data.info[this.data.topic].subtopics]

    Object.keys(this.data.info[this.data.topic].subtopics).map((k) => {
      this.subtopics.push(k);
    })
  }

  getUserInfo = () => {
    this.type = this.userDb.child(this.userId).once('value').then(k => {
      this.type = k.val().loggedAs;
    })
  }

  goToAddSubTopic = () => {
    this.navCtrl.push(AddSubtopicPage, {
      path: this.data.path
    })
  }

  checkUser = () => {
    if (this.type == "instructor") {
      return true;
    } else {
      return false;
    }
  }

  goTOPage(item) {
    if (this.type == "student") {
      this.goToVideosPage(item);
    } else if (this.type == "instructor") {
      this.goToAdminPage(item)
    } else {
      this.goToVideosPage(item);

    }
  }

  goToVideosPage(item) {
    this.navCtrl.push(VideosPage, {
      video: {
        data: this.data.info[this.data.topic].subtopics[item],
        selected: item,
        path: this.data.path + "/subtopics/" + item
      }
    })
  }


  goToAdminPage(item) {
    this.navCtrl.push(AdminPage, {
      video: {
        data: this.data.info[this.data.topic].subtopics[item],
        selected: item,
        path: this.data.path + "/subtopics/" + item
      }
    })
  }

}
