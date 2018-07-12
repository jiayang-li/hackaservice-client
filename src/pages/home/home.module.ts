import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { Tweets } from '../../providers/tweets/tweets';
import { ResponseService } from '../../providers/responses/responses';
import { claimTweetForm } from '../../app/claimTweetForm/claimTweetForm.component';
import { MyResponses } from '../../app/myResponses/myResponses.component';
import { GetTweetsByUser } from '../../app/getTweetsByUser/getTweetsByUser.component';
import { Auth } from '../../providers/auth/auth';
@NgModule({
  declarations: [
    HomePage, claimTweetForm, MyResponses, GetTweetsByUser
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
  providers: [ 
    Tweets, ResponseService, Auth
  ],
  exports: [ 
    HomePage
  ]
})
export class HomePageModule {}
