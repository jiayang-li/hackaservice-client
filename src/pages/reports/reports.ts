import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseChartDirective } from 'ng2-charts'
import { Tweets } from '../../providers/tweets/tweets';

/**
 * Generated class for the ReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  constructor(public navCtrl: NavController,public tweetService: Tweets){ 
  }
  tweets: any;
  goodTweets: any;
  badTweets: any;
  generalQueueTotal2: Number = 50;
  public lineChartData: any[] = [];
  public lineChartDatax: any[] = [];
  public lineChartLabels:Array<any> = [];
  public lineChartLabelsx:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  public lineChartColors:Array<any> = [];
  ionViewDidLoad() { this.getGeneralChart(); }
  changeGeneralQueue(value: Number): void {
    this.generalQueueTotal2 = value;
    this.getGeneralChart();
    setTimeout(() => {
      if (this.chart && this.chart.chart && this.chart.chart.config) {
        this.chart.chart.config.data.labels = this.lineChartLabels;
        this.chart.chart.config.data.datasets = this.lineChartData;
        this.chart.colors = this.lineChartColors;
        this.chart.chart.colors = this.lineChartColors;
        this.chart.chart.update();
      }
    }, 1000);
  }
  getGeneralChart() { 
    this.tweetService.getGoodTweets(this.generalQueueTotal2).then((data) => {
      this.goodTweets = data;
      this.lineChartLabels = this.goodTweets.map((x) => { return x.text.substring(0,10) + '...'; });
      this.lineChartData = [ 
          { data: this.goodTweets.map((q) => { return (q.score) ? Number(q.score.toPrecision(3)) : 0 }), label: 'Sentiment'},
          { data: this.goodTweets.map((a) => { return (a.magnitude) ? Number(a.magnitude.toPrecision(3)) : 0 }), label: 'Magnitude' }
      ];
    }, (err) => { throw err; });
    this.tweetService.getBadTweets(this.generalQueueTotal2).then((data) => {
      this.badTweets = data;
    }, (err) => { throw err; });
  }
}
