import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AddSubtopicPage } from "../add-subtopic/add-subtopic";

/**
 * Generated class for the AddTopicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-topic',
  templateUrl: 'add-topic.html',
})
export class AddTopicPage {

  public topic:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.get('path'))
  }

  goToSubTopic = () => {
    if ((this.topic == "") || (this.topic == null)) {

    } else {
      this.navCtrl.push(AddSubtopicPage, {
        path: this.navParams.get('path')+ "/" + this.topic
      });
    }

  }

}
