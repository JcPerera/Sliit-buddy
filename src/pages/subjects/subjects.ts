import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from "firebase";

import { TopicPage } from "../topic/topic";

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    firebase.database().ref('Subjects ').once('value').then((snapshot) => {
      this.data = (snapshot.val()) || 'Anonymous';
      this.getTheCorrectSubjects();
      Object.keys(this.subjects).map((k)=>{
        this.subArr.push(k);
      })
    });;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubjectsPage');
  }

  getTheCorrectSubjects() {
    this.sem = this.navParams.get('yearNsem');
    if (this.sem.year == "1st Year" && this.sem.semester == 1) {
      this.subjects = this.data.Year1.Semester1;
    } else if (this.sem.year == "1st Year" && this.sem.semester == 2) {
      this.subjects = this.data.Year1.Semester2;
    } else if (this.sem.year == "2nd Year" && this.sem.semester == 1) {
      this.subjects = this.data.Year2.Semester1;
    } else if (this.sem.year == "2nd Year" && this.sem.semester == 2) {
      this.subjects = this.data.Year2.Semester2;
    } else if (this.sem.year == "3rd Year" && this.sem.semester == 1) {
      this.subjects = this.data.Year3.Semester1;
    } else if (this.sem.year == "3rd Year" && this.sem.semester == 2) {
      this.subjects = this.data.Year3.Semester2;
    } else if (this.sem.year == "4th Year" && this.sem.semester == 1) {
      this.subjects = this.data.Year4.Semester1;
    } else if (this.sem.year == "4th Year" && this.sem.semester == 2) {
      this.subjects = this.data.Year4.Semester2;
    } else {
      console.log("error")
    }
  }

  goToTopicPage(topic){
    this.navCtrl.push(TopicPage, {
      topics : {
        sub:this.subjects,
        top:topic
      }

    })
  }
}
