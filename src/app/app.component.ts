import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
 
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';
import { EditProfilePage } from '../pages/editProfile/editProfile.component';
import { ThreatsPage } from '../pages/threats/threats';
import { Storage } from '@ionic/storage';
@Component({
  templateUrl: `app.html`
})
export class MyApp {
  @ViewChild(Nav) nav: NavController;  
  rootPage = LoginPage;
  public mainmenu : any = [];
  constructor(public storage : Storage, platform: Platform, statusBar: StatusBar) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.mainmenu2 = this.nav._children[0];
      statusBar.styleDefault();
      this.mainmenu = [ 
        { 
          tabTitle : 'Home',
          Component: HomePage,
          link: 'goToHome()'
        }, 
        { 
          tabTitle : 'Edit Profile',
          Component: EditProfilePage,
          link: 'goToEditProfile()'
        },
        {
          tabTitle : 'Threats',
          Component: ThreatsPage,
          link: 'goToThreats()'
        }
      ]
    });

  }
  openPage(m) { 
    this.nav.setRoot(m.Component);
  }
  goToHome(Page) { 
    this.nav.setRoot(HomePage);
  }
  goToLogin(Page) { 
    this.nav.setRoot(LoginPage);
  }
  goToThreats(Page) { 
    this.nav.setRoot(ThreatsPage);
  }
  logout() { 
    // sets username and token to null
    this.storage.set("username", "");
    this.storage.set("token", "");
    this.nav.setRoot(LoginPage); // takes user to LoginPage
  }
}