import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { AddTopicPage } from "../add-topic/add-topic";

/**
 * Generated class for the AddSubjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-subject',
  templateUrl: 'add-subject.html',
})
export class AddSubjectPage {
  public subject: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    console.log(this.navParams.get('path'))
  }


  goToTopic = () => {
    if ((this.subject == "") || (this.subject == null)) {

    } else {
      this.navCtrl.push(AddTopicPage, {
        path: this.navParams.get('path') + "/" + this.subject
      });
    }

  }

}
