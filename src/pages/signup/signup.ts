import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { Loading } from 'ionic-angular/components/loading/loading';
 
@Component({
  selector: 'signup-page',
  templateUrl: 'signup.html'
})
export class SignupPage {
  loading: Loading;
  fName: string;
  lName: string;
  role: string;
  lang: string;
  email: string;
  password: string;
 
  constructor(public navCtrl: NavController, public authService: Auth, public loadingCtrl: LoadingController) {
 
  }
 
  register(){
 
    this.showLoader();
 
    let details = {
        email: this.email,
        fName: this.fName,
        lName: this.lName,
        password: this.password,
        role: this.role,
        lang: this.lang
    };
    console.log('stringy: ' + JSON.stringify(details));
    this.authService.createAccount(details).then((result) => {
      this.loading.dismiss();
      console.log(result);
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
        this.loading.dismiss();
    });
 
  }
 
  showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
 
    this.loading.present();
 
  }
 
}