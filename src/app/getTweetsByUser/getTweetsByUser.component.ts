import { Component } from '@angular/core';
import { Platform, NavParams, ViewController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from '../../providers/auth/auth';
import 'rxjs/add/operator/map';
import { Tweets } from '../../providers/tweets/tweets';

@Component({
  template: `
    <ion-content>
        <div style="padding:20px">
            <ion-list>
            <ion-item-sliding #slidingItem  *ngFor="let tweet of data">
                <ion-item text-wrap>
                    <p>{{ tweet.text }}</p>
                    <small>{{ tweet.user }}</small> 
                    <ion-thumbnail item-start>
                        <img src="{{tweet.avatar}}" />
                    </ion-thumbnail>
                </ion-item>
                <ion-item-options>
                    <button ion-button color="primary" (click)="claimTweet(slidingItem, tweet, username)">
                        <ion-icon name="check"></ion-icon>
                        Claim
                    </button>
                </ion-item-options>
                <ion-item-divider></ion-item-divider>
            </ion-item-sliding>
            </ion-list>
        </div>
    </ion-content>
    `
})
export class GetTweetsByUser {
    constructor(private http : Http, private toastCtrl: ToastController, 
        public platform: Platform, params: NavParams, public viewCtrl: ViewController
        ,public authService: Auth, public tweetService: Tweets) {
        this.user = params.get('user');
        this.tweetService.getTweetsByUser(this.user).then((data) => {
            this.data = data;
        });
    }
    url:string = 'https://hackaservice.herokuapp.com/';
    user:string = '';
    data: any;
}