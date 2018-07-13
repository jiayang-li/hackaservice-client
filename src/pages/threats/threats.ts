import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ItemSliding } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { claimTweetForm } from '../../app/claimTweetForm/claimTweetForm.component';
import { Tweets } from '../../providers/tweets/tweets';
import { ResponseService } from '../../providers/responses/responses';
import { GetTweetsByUser } from '../../app/getTweetsByUser/getTweetsByUser.component';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-threats',
  templateUrl: 'threats.html',
})
export class ThreatsPage {
  generalQueueTotal2: Number = 5;
  threatTweets: any;
  username: any;
  public myResponses: any;

  constructor(public storage: Storage, public http: Http, public tweetService: Tweets, 
   public modalCtrl: ModalController, public navCtrl: NavController, 
   public navParams: NavParams, public responseService: ResponseService){ 
     this.storage.get('username').then((value) => {
       this.username = value;
       this.responseService.getMyResponses(this.username).then((datax) => {
         this.myResponses = datax;
       }, (err) => { throw err; });
     });
   }

   private apiUrl = 'https://hackaservice.herokuapp.com/api/threats';
   public data : any = [];
 
   getData() { return this.http.get(this.apiUrl).map((res: Response) => res.json()) }
   getResearch() { this.getData().subscribe(data => { this.threatTweets = data; }) }

  refineDate(timestamp) { 
    timestamp = new Date(timestamp);
    let date = timestamp.getMonth()+1 + '/' + timestamp.getDate()+ '/' + timestamp.getFullYear() + ' @ ' + timestamp.getHours() + ':' +  timestamp.getMinutes()
    return date;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ThreatsPage');
    console.log(this.getData());
    console.log(this.getResearch());
  }
}