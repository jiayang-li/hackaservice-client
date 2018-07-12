import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, AlertController, ViewController, App, Platform, MenuController, NavParams } from 'ionic-angular';
import { SettingsProvider } from './../../providers/settings/settings';
import { LoginPage } from '../login/login';

export interface PageInterface { 
  title:string,
  pageName?:string,
  component?: any,
  tabComponent?:string,
  index?:number,
  icon:string
};
@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  selectedTheme: String;
  menuOrientation: Object;
  dir : boolean = false;
  rootPage: any;
  originalMenu : PageInterface[] = null;
  @ViewChild(Nav) nav: Nav;
  pages: PageInterface[] = [
    { title: 'Home Page', pageName: 'TabsPage', tabComponent: 'HomePage', index: 0, icon: 'home' },
    { title: 'Styling Page', pageName: 'TabsPage', tabComponent: 'StylingPage', index: 1, icon: 'contacts' },
    { title: 'Form Page', pageName: 'TabsPage', tabComponent: 'FormPage', index: 2, icon: 'contacts' },
    { title: 'Components Page', component: 'ComponentsPage', icon: 'contacts' },
    { title: 'Icons Page', pageName: 'TabsPage', tabComponent: 'IconsPage', index: 3, icon: 'home' }
  ]
  constructor(public storage: Storage, public alertCtrl: AlertController, public menuCtrl: MenuController, private settings: SettingsProvider,
  public platform : Platform, public viewCtrl: ViewController, public appCtrl: App, navParams: NavParams) {
    // this holds what theme we are currently using
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    // determines whether to use both side menu and tabs or just side menu
    this.menuOrientation = JSON.parse(localStorage.getItem('menuOrientation'));
    this.rootPage = (this.menuOrientation['tabs']) ? 'TabsPage' : 'LoginPage';
    if (this.platform.is('ios') || this.platform.is('android')) this.dir = true;
    platform.registerBackButtonAction(() => {
      if (this.nav.canGoBack()) { 
        this.nav.pop();
      } else { 
        let alert = this.alertCtrl.create({
          title: 'Hold Your Horses!',
          message: 'Easy there cowboy! You were about to leave the app!',
          buttons: ['Dismiss']
        });
        alert.present();
      }
    })
  }
  openPage(page: PageInterface){ 
    // this sets a parent page
    if(this.menuOrientation['tabs']) 
      if (page.tabComponent) this.nav.setRoot('TabsPage', { index: page.index }); // if tabs are enabled and its one of them
      else this.nav.push(page.component); // if tabs are enabled and its not in there in must be a child
    else this.nav.setRoot((!page.tabComponent) ? page.component : page.tabComponent);
  }
  toggleAppTheme() {
    // this toggles the current theme
    if (this.selectedTheme === 'dark-theme') this.settings.setActiveTheme('light-theme');
    else this.settings.setActiveTheme('dark-theme');
  }
  logout() { 
    // sets username and token to null
    this.storage.set("username", "");
    this.storage.set("token", "");

    this.nav.setRoot(LoginPage); // takes user to LoginPage
  }
}