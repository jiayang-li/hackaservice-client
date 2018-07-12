import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage'
/*
  Generated class for the NotificationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationsProvider {
  public count: Number = 0;
  private storage : Storage;
  constructor() {
    console.log('Hello NotificationsProvider Provider');
    localStorage.setItem('storageTest', 'I am stored in local storage :)');
    console.log('u: ' + localStorage.getItem('storageTest'));
  }
  public setNotif() {
    this.count = Number(this.count) + 1;
    localStorage.setItem('notif', this.count.toString());
  }
  public createLocalNotification() {
    let localNotification = new LocalNotifications();
    localNotification.schedule({
      text: 'This is a system-level notification!',
      trigger: {at: new Date(new Date().getTime() + 10)},
      led: 'FF0000',
      sound: null
    });
  }
  public localStorageTest() { 
    console.log(localStorage.getItem('storageTest'));
    localStorage.setItem('storageTest', 'You just changed a value in local storage!');
    console.log(localStorage.getItem('storageTest'));
    // this.localStorageTestVar = localStorage.getItem('storageTest');
  }
  public alternateStorageSet() { 
    this.storage.set('name', 'Joe');
  }
  public alternateStorageGet() { 
    this.storage.get('name').then((val) => {
      alert('Your age is: ' + val);
    });
  }
}
