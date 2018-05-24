import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import * as firebase from 'firebase';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  public name: any;
  public key: any;
  public database: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.database = firebase.database().ref(this.navParams.get('path'));
  }

  addToDb = () =>{
    if((this.name == null)||this.name == ""){
      
    }else if((this.key == null)||this.key == ""){
      
    }else{
      this.database.push({
        name: this.name,
        video:this.key,
        
      })
    }
   
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  
}
