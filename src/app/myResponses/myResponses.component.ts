import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import { Auth } from '../../providers/auth/auth';
import 'rxjs/add/operator/map';
import { ResponseService } from '../../providers/responses/responses';
@Component({
    selector: 'my-responses',
    template: `
        <h1>My Responses</h1>
        <ion-list>
            <ion-item *ngFor="let res of myResponses">
                {{res.response}}
            </ion-item>
        </ion-list>
    `
})
export class MyResponses {
    username: any;
    public responses: any;
    constructor(public storage: Storage, public responseService: ResponseService, public authService: Auth) {
      this.storage.get('username').then((value) => {
        this.username = value;
        this.responseService.getMyResponses(this.username).then((datax) => {
            if (datax) { 
                this.responses = datax;
            } 
        }, (err) => { throw err; });
      });
    }
}