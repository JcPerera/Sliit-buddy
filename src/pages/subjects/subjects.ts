import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from "firebase";
import { LoadingController, ModalController } from 'ionic-angular';

import { TopicPage } from "../topic/topic";
import { AddSubjectPage } from "../add-subject/add-subject";

/**
 * Generated class for the SubjectsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subjects',
  templateUrl: 'subjects.html',
})
export class SubjectsPage {
  public data: any;
  public subjects: any;
  public sem: any;
  public subArr = [];
  public path: any;
  public loading: any;
  public userId: any;
  public userDb: any;
  public type: any;


  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {
    this.displayPreloader('Loading Data');
  }

  ionViewCanEnter() {
    this.userId = firebase.auth().currentUser.uid;
    this.userDb = firebase.database().ref('users')
    this.getUserInfo();
    firebase.database().ref('Subjects').once('value').then((snapshot) => {
      this.data = (snapshot.val());
      this.getTheCorrectSubjects();
      this.subArr = []
      Object.keys(this.subjects).map((k) => {
        this.subArr.push(k);
      })
      this.hidePreloader();
    }).catch(k => {
      console.log(k);
    });;
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

  getTheCorrectSubjects() {
    this.sem = this.navParams.get('yearNsem');
    let year;
    let part;
    if (this.sem.year == "1st Year") {
      year = "Year1"
    } else if (this.sem.year == "2nd Year") {
      year = "Year2"
    } else if (this.sem.year == "3rd Year") {
      year = "Year3"
    } else if (this.sem.year == "4th Year") {
      year = "Year4"
    } else {
      console.log("error in finding correct year")
    }

    if (this.sem.semester == 1) {
      part = "Semester1"
    } else if (this.sem.semester == 2) {
      part = "Semester2"
    } else {
      console.log("error in finding correct semster")
    }

    this.subjects = this.data[year][part];
    this.path = year + "/" + part;
  }

  goToTopicPage(topic) {
    this.navCtrl.push(TopicPage, {
      topics: {
        sub: this.subjects,
        top: topic,
        path: "/Subjects/" + this.path + "/" + topic
      }

    })
  }

  displayPreloader(msg: any): void {
    this.loading = this.loadingCtrl.create({
      content: msg
    });

    this.loading.present();
  }

  hidePreloader(): void {
    this.loading.dismiss();
  }

  goToAddSubject() {
    this.navCtrl.push(AddSubjectPage, {
      path: "/Subjects/" + this.path
    })
  }
}
