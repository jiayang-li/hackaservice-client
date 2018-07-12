import { Component } from "@angular/core";
import { NavController, ModalController, LoadingController, ItemSliding } from 'ionic-angular';
import { Tweets } from '../../providers/tweets/tweets';
import { Auth } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map'
import { ViewChild } from '@angular/core';
import { claimTweetForm } from '../../app/claimTweetForm/claimTweetForm.component';
import { MyResponses } from '../../app/myResponses/myResponses.component';
import { GetTweetsByUser } from '../../app/getTweetsByUser/getTweetsByUser.component';
import { ViewResponse } from '../../app/viewResponse/viewResponse.component';
import { ResponseService } from '../../providers/responses/responses';
import { BaseChartDirective } from 'ng2-charts'
@Component({
  selector: 'home-page',
  templateUrl: 'home.html',
  styles: ['.queue h1 { padding-left: 15px; }']
})
export class HomePage {
  zeep: number = 0;
  loading: any;
  tweets: any;
  goodTweets: any;
  badTweets: any;
  username: any;
  whichPage: String = 'Good';
  generalQueueTotal2: Number = 5;
  public myResponses: any;
  constructor(public storage: Storage, public navCtrl: NavController, 
  public tweetService: Tweets, public modalCtrl: ModalController, 
  public authService: Auth, public loadingCtrl: LoadingController,
  public responseService: ResponseService){ 
    this.storage.get('username').then((value) => {
      this.username = value;
      this.responseService.getMyResponses(this.username).then((datax) => {
        this.myResponses = datax;
      }, (err) => { throw err; });
    });
  }
  unslideItem(slidingItem: ItemSliding) { 
    slidingItem.close();
  }
  claimTweet(slidingItem, tweet, user) {
    this.unslideItem(slidingItem);
    let prompt = this.modalCtrl.create(claimTweetForm, { tweet: tweet, user: user });
    prompt.onDidDismiss((data) => {
      this.responseService.getMyResponses(this.username).then((datax) => {
        this.myResponses = datax;
      }, (err) => { throw err; });
    });
    prompt.present();
  }
  getResponseModal(res) { 
    let prompt = this.modalCtrl.create(ViewResponse, { res : res } );
    prompt.present();
  }
  getTweetsByUser(user) { 
    let prompt = this.modalCtrl.create(GetTweetsByUser, { user : user } );
    prompt.present();
  }
  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    this.loading.present();
  }
  refineDate(timestamp) { 
    timestamp = new Date(timestamp);
    let date = timestamp.getMonth()+1 + '/' + timestamp.getDate()+ '/' + timestamp.getFullYear() + ' @ ' + timestamp.getHours() + ':' +  timestamp.getMinutes()
    return date;
  }
  ionViewDidLoad() { this.getGeneralChart(); }
  changeGeneralQueue(value: Number): void {
    this.generalQueueTotal2 = value;
    this.getGeneralChart();
  }
  getGeneralChart() { 
    this.storage.get('lang').then((res) => {
      console.log('toledo: ' + res);
      let tweetObj = { number: this.generalQueueTotal2, lang: res.toString() }
      this.tweetService.getGoodTweets(tweetObj).then((data) => {
        this.goodTweets = data;
      }, (err) => { throw err; });
      this.tweetService.getBadTweets(tweetObj).then((data) => {
        this.badTweets = data;
      }, (err) => { throw err; });
    });
  }
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
}