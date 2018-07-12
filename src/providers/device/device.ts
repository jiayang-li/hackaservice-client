import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device';
import { AlertController, Alert } from 'ionic-angular';

/*
  Generated class for the DeviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DeviceProvider {

  constructor(private alertCtrl: AlertController) {
    console.log('Hello DeviceProvider Provider');
  }
  public showDeviceInfo() {
    let device = new Device();
    let alert = this.alertCtrl.create({
      title: 'Device Info',
      message: (`
      <ul>
        <li>Model: ` + device.model + 
        `</li><li>\nPlatform: ` + device.platform + 
        `</li><li>\nSerial Number: ` + device.serial +
        `</li><li>\nManufacturer: ` + device.manufacturer + 
        `</li><li>\nIs on a simulator?: ` + device.isVirtual +
      `</li></ul>`),
      buttons: ['Okay']
    });
    alert.present();
  }
}
