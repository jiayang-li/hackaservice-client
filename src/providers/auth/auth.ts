import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
@Injectable()
export class Auth {
  url: string = 'https://hackaservice.herokuapp.com/';
  public token: any;
  constructor(public http: Http, public storage: Storage) {}
  checkAuthentication(){
    return new Promise((resolve, reject) => {
        //Load token if exists
        this.storage.get('token').then((value) => {
          this.token = value;
          let headers = new Headers();
          headers.append('Authorization', this.token);
          this.http.get(this.url + 'api/auth/protected', {headers: headers})
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
        });        
    });
  }
  createAccount(details){
    console.log('the detz: ' + JSON.stringify(details));
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.url + 'api/auth/register', JSON.stringify(details), {headers: headers})
        .subscribe(res => {
          let data = res.json();
          console.log('Sacramento: ' + JSON.stringify(data));
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }
  login(credentials){
    console.log('urh: ' + JSON.stringify(credentials));
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.url + 'api/auth/login', JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          let data = res.json();
          console.log('tallahasse: ' + JSON.stringify(data));
          this.token = data.token;
          this.storage.set('token', data.token);
          this.storage.set('username', credentials.email);     
          this.storage.set('role', data.user.role);     
          this.storage.set('lang', data.user.lang);       
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }
  logout(){
    this.storage.set('token', '');
    this.storage.set('username', '');
  }
}