import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = this.navParams.get("subtopics")
    //Since this is an array (not an object)
    this.subtopics=[...this.data.info[this.data.topic].subtopics]
  }

}
