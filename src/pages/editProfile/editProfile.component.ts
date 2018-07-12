import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth/auth';
import { Loading } from 'ionic-angular/components/loading/loading';
import { User } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
 
@Component({
  selector: 'edit-profile',
  templateUrl: 'editProfile.html'
})
export class EditProfilePage {
  loading: Loading;
  role: string;
  email: string;
  fName: string;
  lName: string;
  lang: string;
  constructor(public storage: Storage, public userService: User, public navCtrl: NavController, public authService: Auth, public loadingCtrl: LoadingController) {
    this.email = localStorage.getItem('username');
    this.storage.get('token').then((res) => {
      res = JSON.parse(window.atob(res.split(' ')[1].split('.')[1]));
      this.email = res.email;
      this.userService.getProfile(this.email).then((data) => { 
        this.role = data['role'];
        this.email = data['email'];
        this.fName = data['firstName'];
        this.lName = data['lastName'];
        this.lang = data['lang'];
      }); 
    });
  }
  updateProfile() { 
      let details = {
        fName: this.fName,
        lName: this.lName,
        email: this.email,
        lang: this.lang,
        role: this.role
      };
      this.userService.updateProfile(details).then((data) => { 
        console.log('after: ' + data);
      }); 
  }
}