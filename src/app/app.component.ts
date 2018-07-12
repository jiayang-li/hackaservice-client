import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
 
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';
import { EditProfilePage } from '../pages/editProfile/editProfile.component';
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
          tabTitle : 'About',
          Component: LoginPage,
          link: 'goToAbout()'
        },
        { 
          tabTitle : 'SignUp',
          Component: SignupPage,
          link: 'goToContact()'
        }, 
        { 
          tabTitle : 'Edit Profile',
          Component: EditProfilePage,
          link: 'goToEditProfile()'
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
  goToSignup(Page) { 
    this.nav.setRoot(SignupPage);
  }
  goToEditProfile(Page) { 
    this.nav.setRoot(EditProfilePage);
  }
  logout() { 
    // sets username and token to null
    this.storage.set("username", "");
    this.storage.set("token", "");
    this.nav.setRoot(LoginPage); // takes user to LoginPage
  }
}