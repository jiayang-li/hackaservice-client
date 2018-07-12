import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tab',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  params: Object;
  LoginPageRoot = 'HomePage';
  HomePageRoot = 'HomePage';
  StylingPageRoot = 'StylingPage';
  FormPageRoot = 'FormPage';
  indexer: number = 0;
  count: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('IN TABZ');
    console.log(navParams.get('index'));
    this.indexer = navParams.get('index') || 0;
  }
  notif() {
    // notif() is used to apply a badge notification (meatball) to a tab 
    // We are storing the meatball count in local storage but another method of storage is achieveable
    return window.localStorage.getItem('notif') ? window.localStorage.getItem('notif') : ''; 
  }
}
