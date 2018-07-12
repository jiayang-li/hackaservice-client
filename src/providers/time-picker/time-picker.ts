import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AmazingTimePickerService } from 'amazing-time-picker';

/*
  Generated class for the TimePickerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TimePickerProvider {

  constructor(private atp: AmazingTimePickerService) {
    console.log('Hello TimePickerProvider Provider');
  }
  public openTimePicker() { 
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => { console.log(time); });
  }
}
