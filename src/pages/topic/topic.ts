import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SubtopicsPage } from "../subtopics/subtopics";

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = this.navParams.get("topics");
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
  
}
