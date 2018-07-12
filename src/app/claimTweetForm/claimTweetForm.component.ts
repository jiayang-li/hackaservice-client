import { Component } from '@angular/core';
import { Platform, NavParams, ViewController, NavController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from '../../providers/auth/auth';
import 'rxjs/add/operator/map';
import { Tweets } from '../../providers/tweets/tweets';

@Component({
  template: `
    <ion-content padding style="padding-top:30px">
        <ion-title style="display:inline-block">
        <img src="{{tweet.avatar}}" style="display:inline-block" />
        <h2 style="display:inline-block;top: -13px;position: relative;">
        {{ tweetUser }} says: </h2></ion-title>
        <ion-buttons end style="float: right;display:inline-block">
            <button ion-button icon-only (click)="closeModal()">
                <ion-icon item-right name="ios-close-outline"></ion-icon>
            </button>
        </ion-buttons><br/>
        <hr/>
        <input type="hidden" name="in_reply_to" [(ngModel)]="in_reply_to" />
        <input type="hidden" name="user" [(ngModel)]="user" />
        <span style="font-size:1.3em">
        {{ tweet.text }}
        </span> <br/> <br/>
        <hr/>
        <strong>{{ tweet.followers }} followers</strong><br/>
        <strong>{{ tweet.score }} semantic score</strong><br/>
        <strong>{{ tweet.magnitude }} semantic magnitude</strong><br/>
        
        <form #form="ngForm" (ngSubmit)="logForm(form)" novalidate>
            <ion-label>Response: </ion-label>
            <ion-textarea [(ngModel)]="text" name="text" style="border: 1px solid #DDD;
            border-radius: 4px;
            height: 100px;
            margin: 0px;
            padding: 0px;
            width: 100%;"></ion-textarea>
            <button ion-button type="submit" block>Respond to {{ tweetUser }}</button>
        </form>
    </ion-content>
    `
})
export class claimTweetForm {
    constructor(private navCtrl: NavController, private http : Http, private toastCtrl: ToastController, 
        public platform: Platform, params: NavParams, public viewCtrl: ViewController
        ,public authService: Auth) {
        this.tweet = params.get('tweet');
        this.user = params.get('user');
        this.in_reply_to = this.tweet['id'];
        this.tweetUser = this.tweet['user'];
    }
    in_reply_to: any;
    tweet: Object; 
    user: String;
    tweetUser: string;
    text: String;
    newTweet: any;
    logForm() { 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.token);
        let tweetObj = { user: this.tweetUser, text: this.text, in_reply_to: this.in_reply_to };
        // uncomment this to actually post tweet
        this.http.post('https://hackaservice.herokuapp.com/api/tweets/postTweet/', 
        JSON.stringify(tweetObj), { headers: headers })
            .subscribe(res => { this.claimedSuccessfully(res); });
        this.claimedSuccessfully(tweetObj); 
        this.viewCtrl.dismiss();
    }
    claimedSuccessfully(res) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.token);
        let tweetObj = { 
            id: this.in_reply_to,
            user: this.tweetUser,
            csr: this.user,
            response: this.text
        };
        this.http.post('https://hackaservice.herokuapp.com/api/responses/saveResponse/', 
        JSON.stringify(tweetObj), { headers: headers })
        .subscribe(res => { console.log('response saved: ' + res); });
        this.newTweet = tweetObj;
        let toast = this.toastCtrl.create({ 
            message: 'Your response has been sent!',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }
    closeModal() {
        this.navCtrl.pop();
    }
}