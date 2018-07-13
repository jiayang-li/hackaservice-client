import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { Loading } from 'ionic-angular/components/loading/loading';
import { LoginPage } from '../login/login';
 
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
        firstName: this.fName,
        lastName: this.lName,
        password: this.password,
        role: this.role,
        lang: this.lang
    };
    console.log('stringyz: ' + JSON.stringify(details));
    this.authService.createAccount(details).then((result) => {
      this.loading.dismiss();
      console.log('bosnia: ' + result);
      this.navCtrl.setRoot(LoginPage);
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