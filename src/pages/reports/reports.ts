import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NUMBER_VALUE_ACCESSOR } from '@angular/forms/src/directives/number_value_accessor';

/**
 * Generated class for the ChartsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})

export class ReportsPage {
  public lineData: Observable<any>
  public barData: Observable<any>
  public lineChartAverageScore: Array<any>
  public lineChartDate: Array<any>
  public barChartScore: Array<any>
  public barChartCount: Array<any> = [0,0,0,0,0,0,0,0];

  constructor(public navCtrl: NavController, public httpClient: HttpClient) {
    this.lineData = this.httpClient.get('http://hackaservice.herokuapp.com/api/charts/');
    this.barData = this.httpClient.get('http://hackaservice.herokuapp.com/api/charts/recent')
    this.lineData.subscribe(data => {
      this.lineData = data;
      this.assignData("lineChart");
    })
    this.barData.subscribe(data => {
      this.barData = data;
      this.assignData("barChart");
    })
  }

  // Change Datatype of API Data
  async modifyData(chartType) {
    if (chartType == "lineChart") {
      let lineDataToStr = await JSON.stringify(this.lineData);
      let lineStrToJSON = await JSON.parse(lineDataToStr);
      return lineStrToJSON;
    }
    else {
      let barDataToStr = await JSON.stringify(this.barData);
      let barStrToJSON = await JSON.parse(barDataToStr);
      return barStrToJSON;
    }
  }

  // Count Data for Bar Chart
  async countData() {
    for (let i in this.barData) {
      let score = parseFloat(this.barData[i].score);
      console.log(score);
      switch(true) {
        case score < -0.75:
          this.barChartCount[0]++;
          break;
        case score < -0.5:
          this.barChartCount[1]++;
          break;
        case score < -0.25:
          this.barChartCount[2]++;
          break;  
        case score < 0:
          this.barChartCount[3]++;
          break;
        case score < 0.25:
          this.barChartCount[4]++;
          break;
        case score < 0.5:
          this.barChartCount[5]++;
          break;
        case score < 0.75:
          this.barChartCount[6]++;
          break;
        default:
          this.barChartCount[7]++;
          break;
      }
    }
  }

  // Assign Data to Variables for Line Chart
  public assignData(chartType) {
    if (chartType == "lineChart") {
      this.lineChartAverageScore = new Array();
      this.lineChartDate = new Array();
      this.modifyData(chartType).then(res => {
        for (let i in res) {
          this.lineChartAverageScore.push(res[i].averageScore);
          let dateSubString = res[i].date.substring(0, res[i].date.indexOf("T")).split("-");
          this.lineChartDate.push(dateSubString[1] + "-" + dateSubString[2] + "-" + dateSubString[0]);
        }
      })
      this.lineChartData = [{ data: this.lineChartAverageScore, label: "Average Score" }];
      this.lineChartLabels = this.lineChartDate;
    }
    else {
      this.barChartScore = new Array();
      this.modifyData(chartType).then(res => {
        for (let i in res) {
          this.barChartScore.push(res[i].score);
        }
      })
      this.barChartLabels = ["-1 to -0.75", "-0.75 to -0.5", "-0.5 to -0.25", "-0.25 to 0", 
        "0 to 0.25", "0.25 to 0.5", "0.5 to 0.75", "0.75 to 1"];
      this.countData().then(res => {
        console.log("barChartCount: " + this.barChartCount);
        this.barChartData = [{ data: this.barChartCount, label: "Count" }];
      });
    }
  }

  /* ********************************************************************************** */  

  // Line Chart Data Variables
  public lineChartData: Array<any> = [];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions: any = {
    responsive: true,
    title: {
      text: "Daily Average Score",
      display: true
    },
    legend: { position: "bottom" }
  };
  public lineChartColors: Array<any> = [
    { 
      // Grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { 
      // Dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { 
      // Grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  
  // Line Chart Events
  public lineChartClicked(e: any): void {
    console.log(e);
  }
  public lineChartHovered(e: any): void {
    console.log(e);
  }

  /* ********************************************************************************** */  

  // Bar Chart Data Variables
  public barChartData: Array<any> = [];
  public barChartLabels:Array<any> = [];
  public barChartOptions: any = {
    responsive: true,
    title: {
      text: "", 
      display: true
    },
    legend: { position: "bottom" },
  };
  public barChartColors: Array<any> = [
    { 
      // Grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { 
      // Dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { 
      // Grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public barChartLegend: boolean = true;
  public barChartType: string = 'bar';
  
  // Bar Chart Events
  public barChartClicked(e: any): void {
    console.log(e);
  }
  public barChartHovered(e: any): void {
    console.log(e);
  }
}
