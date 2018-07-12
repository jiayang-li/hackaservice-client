import { Component } from '@angular/core';
import { Platform, NavParams, ViewController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from '../../providers/auth/auth';
import 'rxjs/add/operator/map';
import { Tweets } from '../../providers/tweets/tweets';

@Component({
    selector: 'my-responses',
    template: `
    <ion-content>
    <div style="padding:20px">
        <div>
            <h2 style="display:inline-block">Your response: </h2>
        </div>
        <span style="font-size:1.3em">
        {{ response.response }}
        </span> <br/>
        <small> {{ response.createdAt }} </small>
        <hr/>
    </div>
    </ion-content>
    `
})
export class ViewResponse {
    username: any;
    public responses: any;
    response: any;
    constructor(private http : Http, private toastCtrl: ToastController, 
        public platform: Platform, params: NavParams, public viewCtrl: ViewController
        ,public authService: Auth) {
        this.response = params.get('res');
        console.log('beeboop:  ' + JSON.stringify(this.response))
    }
}