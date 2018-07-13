import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ResponseService } from '../../providers/responses/responses';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'page-god',
  templateUrl: 'god.html',
})
export class GodPage {
  areYouAGodVariable: boolean = false;
  users: any;
  username: any;
  public myResponses: any;

  constructor(public http: Http, public storage : Storage, public navCtrl: NavController, 
    public navParams: NavParams, public responseService: ResponseService) {
    this.areYouAGod();
    this.getResearch();
  }
  
  areYouAGod() { 
    // so unsafe lol
    this.storage.get('role')
    .then((data) => { 
      console.log('shit: ' + data);
      if (data === 'god') { 
        console.log('lordy, you are a god');
        this.areYouAGodVariable = true;
      }
    })
  }

  getUser(value){
    console.log(value);
 }

  private apiUrlDeleteUser = 'https://hackaservice.herokuapp.com/api/admin/delete';
  deleteUser(value){ 
    console.log(value);
  }

  private apiUrlAddUser = 'https://hackaservice.herokuapp.com/api/admin/add';
  addUser(){ 
    console.log("add");
  }

  private apiUrlGetUsers = 'https://hackaservice.herokuapp.com/api/admin';
  public userData : any = [];

  getUsersData() { return this.http.get(this.apiUrlGetUsers).map((res: Response) => res.json()) }
  getResearch() { this.getUsersData().subscribe(userData => { this.users = userData; }) }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad GodPage');
  }
}
