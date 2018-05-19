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
  public sub;
  public temp;
  public topics = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = this.navParams.get("topics");
    this.sub = this.data.sub;
    let topic = this.data.top;


    Object.keys(this.sub[topic]).map((k)=>{
    this.topics.push(k);
      
    })
  }

  // goToSubtopic(data){
  //   this.navCtrl.push(SubtopicsPage, {
  //     subtopics : {
  //       topics : this.sub[topic]
  //     }
  //   })
  // }
  
}
