import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController, Alert, App } from 'ionic-angular';

/*
  Generated class for the GeoLocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeoLocationProvider {
  private geoLatLong: any;       // Most recently polled geo location (Lat,Long), as a string
  private geoTimeStamp: any;     // Most recently polled geo location timestamp, as a JS timestamp
  public geolocation: Geolocation;
  constructor(private alertCtrl : AlertController) {
    console.log('Hello GeoLocationProvider Provider');
    this.geolocation = new Geolocation();
  }
  public geoLocate() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let alert = this.alertCtrl.create({
        title: 'Your Location',
        message: ('Latitude: ' + resp.coords.latitude + ' \nLongitude: ' + resp.coords.longitude + ''),
        buttons: [
          {
            text: 'Dismiss',
            role: 'cancel',
            handler: data => {}
          },
          {
            text: 'Open in Maps',
            handler: data => {
              var url = "https://maps.google.com/?q=" + resp.coords.latitude + "," + resp.coords.longitude;
              window.open(url);
            }
          }
        ]
      });
      alert.present();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => { });
  }
}
