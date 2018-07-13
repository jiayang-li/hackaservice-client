import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the GodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-god',
  templateUrl: 'god.html',
})
export class GodPage {
  areYouAGodVariable: boolean = false;
  constructor(public storage : Storage, public navCtrl: NavController, public navParams: NavParams) {
    this.areYouAGod();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GodPage');
  }
  areYouAGod() { 
    // so unsafe lol
    this.storage.get('role')
    .then((data) => { 
      console.log('shit: ' + data);
      if (data === 'god') { 
        console.log('lordy, you are a god');
        this.areYouAGodVariable = true;
      }
    })
  }
}
