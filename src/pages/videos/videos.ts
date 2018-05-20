import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VideosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html',
})
export class VideosPage {

  public videos = []

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.get('video').data)
    this.videos = [...this.navParams.get('video').data]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideosPage');
  }

}
