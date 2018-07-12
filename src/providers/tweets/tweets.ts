import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from '../auth/auth';
import 'rxjs/add/operator/map';
@Injectable()
export class Tweets {
  url:string = 'https://hackaservice.herokuapp.com/';
  constructor(public http: Http, public authService: Auth) {}
  getTweets(numberOfTweets){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      this.http.get(this.url + 'api/tweets/' + numberOfTweets, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }
  getGoodTweets(numberOfTweets){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      this.http.get(this.url + 'api/tweets/good/' + numberOfTweets, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }
  getBadTweets(numberOfTweets){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      this.http.get(this.url + 'api/tweets/bad/' + numberOfTweets, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }
  claimTweet(tweet, userId) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);
      return this.http
        .put(this.url + 'api/claimTweet/' + tweet, { user: userId }, { headers: headers })
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  getMyTweets(user) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      this.http.get(this.url + 'api/myTweets/' + user, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }
  getTweetsByUser(user) { 
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Authorization', this.authService.token);
        this.http.get(this.url + 'api/tweets/byUser/' + user, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
            resolve(data);
        }, (err) => {
            reject(err);
        });
    });
  }
}