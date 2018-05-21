import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VideosPage } from "../videos/videos";

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
    console.log(this.data.info[this.data.topic].subtopics)
    //Since this is an array (not an object)
    //this.subtopics=[...this.data.info[this.data.topic].subtopics]

    Object.keys(this.data.info[this.data.topic].subtopics).map((k) => {
      this.subtopics.push(k);
    })
    console.log(this.data.path);
  }

  goToVideosPage(item) {
    this.navCtrl.push(VideosPage, {
      video :{
        data: this.data.info[this.data.topic].subtopics[item],
        selected: item,
        path: this.data.path+"/subtopics/"+item
      }
    })
  }


}
