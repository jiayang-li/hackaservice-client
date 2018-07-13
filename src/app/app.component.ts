import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
 
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';
import { EditProfilePage } from '../pages/editProfile/editProfile.component';
import { ThreatsPage } from '../pages/threats/threats';
import { Storage } from '@ionic/storage';
import { GodPage } from '../pages/god/god';
import { ReportsPage } from '../pages/reports/reports';
@Component({
  templateUrl: `app.html`
})
export class MyApp {
  @ViewChild(Nav) nav: NavController;  
  rootPage = LoginPage;
  amIAGod: boolean = false;
  public mainmenu : any = [];
  constructor(public storage : Storage, platform: Platform, statusBar: StatusBar) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.mainmenu2 = this.nav._children[0];
      statusBar.styleDefault();
      this.storage.get('role').then((data) => { 
        console.log('beep: ' + data);
        if (data === 'god')
          this.amIAGod = true;
      })
    });

  }
  openPage(m) { 
    this.nav.setRoot(m.Component);
  }
  goToReports() {
     this.nav.setRoot(ReportsPage);
  }
  goToHome() { 
    this.nav.setRoot(HomePage);
  }
  goToEditProfile() { 
    this.nav.setRoot(EditProfilePage);
  }
  goToLogin() { 
    this.nav.setRoot(LoginPage);
  }
  goToThreats() { 
    this.nav.setRoot(ThreatsPage);
  }
  goToGodPage() { 
    this.nav.setRoot(GodPage);
  }
  logout() { 
    // sets username and token to null
    this.storage.set("username", "");
    this.storage.set("token", "");
    this.nav.setRoot(LoginPage); // takes user to LoginPage
  }

}