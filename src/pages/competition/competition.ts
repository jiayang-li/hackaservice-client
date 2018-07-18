import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ItemSliding } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { claimTweetForm } from '../../app/claimTweetForm/claimTweetForm.component';
import { Tweets } from '../../providers/tweets/tweets';
import { ResponseService } from '../../providers/responses/responses';
import { GetTweetsByUser } from '../../app/getTweetsByUser/getTweetsByUser.component';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-competition',
  templateUrl: 'competition.html',
})
export class CompetitionPage {

  generalQueueTotal2: Number = 5;
  tweets: any;
  username: any;
  public myResponses: any;

  constructor(public storage: Storage, public http: Http, public tweetService: Tweets, 
   public modalCtrl: ModalController, public navCtrl: NavController, 
   public navParams: NavParams, public responseService: ResponseService){ 
   }

   private apiUrl = 'https://hackaservice.herokuapp.com/api/competition';
   public data : any = [];
 
  getData() { return this.http.get(this.apiUrl).map((res: Response) => res.json()) }
  getResearch() { this.getData().subscribe(data => { this.tweets = data; }) }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThreatsPage');
    console.log(this.getData());
    console.log(this.getResearch());
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
  
}
