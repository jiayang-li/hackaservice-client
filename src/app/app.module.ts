import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { EditProfilePage } from '../pages/editProfile/editProfile.component';
import { Auth } from '../providers/auth/auth';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { Tweets } from '../providers/tweets/tweets';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { claimTweetForm } from './claimTweetForm/claimTweetForm.component';
import { GetTweetsByUser } from './getTweetsByUser/getTweetsByUser.component';
import { ViewResponse } from './viewResponse/viewResponse.component';
import { User } from '../providers/user/user';
import { ResponseService } from '../providers/responses/responses';
import { ThreatsPage } from '../pages/threats/threats';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage, 
    EditProfilePage,
    claimTweetForm,
    GetTweetsByUser,
    ViewResponse,
    ThreatsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp), 
    IonicStorageModule.forRoot(),
    BrowserModule, HttpModule,
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage, 
    ThreatsPage,
    EditProfilePage,
    claimTweetForm,
    GetTweetsByUser,
    ViewResponse
  ],
  providers: [Storage, Auth, StatusBar, Tweets, User, ResponseService ]
})
export class AppModule {}