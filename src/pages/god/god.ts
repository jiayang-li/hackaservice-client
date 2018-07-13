import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ResponseService } from '../../providers/responses/responses';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Auth } from '../../providers/auth/auth'
@Component({
  selector: 'page-god',
  templateUrl: 'god.html',
})
export class GodPage {
  radioLister: string;
  deleteEmail: string;
  fName: string;
  lName: string;
  role: string;
  lang: string;
  email: string;
  password: string;
  areYouAGodVariable: boolean = false;
  users: any;
  username: any;
  public myResponses: any;
  url:string = 'https://hackaservice.herokuapp.com/';
  constructor(public auth: Auth, public http: Http, public storage : Storage, public navCtrl: NavController, 
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
    return new Promise((resolve, reject) => {
      console.log('uh: ' + this.radioLister);
      let fakeUser = { 
        email: this.radioLister
      }
      console.log("deleteing");
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.auth.token);
      return this.http.post(this.url + 'api/admin/delete/',JSON.stringify(fakeUser), { headers: headers })
        .subscribe(data => {
          console.log(data);
          this.getResearch();
          resolve(data);
        }, (err) => {
          reject(err);
        });
      });

  }

  private apiUrlAddUser = 'https://hackaservice.herokuapp.com/api/admin/add';
  addUser(){ 
    return new Promise((resolve, reject) => {
    let fakeUser = { 
      fName: this.fName,
      lName: this.lName,
      email: this.email,
      password: this.password,
      role: this.role,
      lang: this.lang,
    }
    console.log("add");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.auth.token);
    return this.http.put(this.url + 'api/admin/add/', JSON.stringify(fakeUser), { headers: headers })
      .subscribe(data => {
        console.log(data);
        this.getResearch();
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }

  private apiUrlGetUsers = 'https://hackaservice.herokuapp.com/api/admin';
  public userData : any = [];

  getUsersData() { return this.http.get(this.apiUrlGetUsers).map((res: Response) => res.json()) }
  getResearch() { this.getUsersData().subscribe(userData => { this.users = userData; }) }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad GodPage');
  }
}
