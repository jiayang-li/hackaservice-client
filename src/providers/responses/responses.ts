import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from '../auth/auth';
import 'rxjs/add/operator/map';
@Injectable()
export class ResponseService {
  url:string = 'https://hackaservice.herokuapp.com/';
  constructor(public http: Http, public authService: Auth) {}
  getMyResponses(user) { 
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      this.http.get(this.url + 'api/responses/getResponses/' + user, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }
  postMyResponse(tweet) { 
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.token);
        let tweetObj = { 
            id: tweet.in_reply_to,
            user: tweet.tweetUser,
            csr: tweet.user,
            response: tweet.text
        };
        this.http.post('https://hackaservice.herokuapp.com/api/responses/saveResponse/', 
        JSON.stringify(tweetObj), { headers: headers })
        .map(res => res.json())
        .subscribe(res => { resolve(res); }, (err) => { reject(err); });
    });
  }
}