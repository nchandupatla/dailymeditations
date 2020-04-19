import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';

export const StorageString ="mydmsessions";


export interface MySession {
  date: Date;
  minsActual: number;
  minsExpected: number;
}

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  mySessions:MySession[]

  constructor(private storage: StorageMap) {
    this.storage.get(StorageString).subscribe((data: any) => {
      if(!data) {
        this.storage.set(StorageString, []).subscribe(() => {
          console.log('init storage');
        });
      } else {
        this.mySessions = data
      }
    });
  }

  addToSessions(s: MySession) {
    this.mySessions.push(s);
    console.log('current storage: ' +s+ ': '+this.mySessions);
    this.storage.set(StorageString, this.mySessions).subscribe(() => {
      console.log('updated storage');
    });
  }
}

