import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ThreatsPage } from './threats';

@NgModule({
  declarations: [
    ThreatsPage,
  ],
  imports: [
    IonicPageModule.forChild(ThreatsPage),
  ],
})
export class ThreatsPageModule {}
