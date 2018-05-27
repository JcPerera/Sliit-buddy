import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { AdminPage } from "../admin/admin";
/**
 * Generated class for the AddSubtopicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-subtopic',
  templateUrl: 'add-subtopic.html',
})
export class AddSubtopicPage {

  public subTopic: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {
    console.log(this.navParams.get('path'))
  }

  presentModal() {
    if ((this.subTopic == "") || (this.subTopic == null)) {

    } else {
      this.navCtrl.push(AdminPage, {
        video:{
          path: this.navParams.get('path') + "/subtopics/" + this.subTopic
        }
      });
    }

  }

}
