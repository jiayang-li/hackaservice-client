import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from '../auth/auth';
import 'rxjs/add/operator/map';
@Injectable()
export class User {
  url:string = 'https://hackaservice.herokuapp.com/';
  constructor(public http: Http, public authService: Auth) {}
  getProfile(user){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      this.http.get(this.url + 'api/profile/' + user, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }
  updateProfile(user){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);
      this.http.put(
        this.url + 'api/profile/updateProfile', 
        { user: user }, 
        {headers: headers})
        .subscribe(data => {
          console.log(data);
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }
}