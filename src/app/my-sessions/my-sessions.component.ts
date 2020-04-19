import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { SessionsService, StorageString, MySession } from '../sessions.service';

@Component({
  selector: 'app-my-sessions',
  templateUrl: './my-sessions.component.html',
  styleUrls: ['./my-sessions.component.css']
})
export class MySessionsComponent implements OnInit  {
  sessions: any

  constructor(private sessionsService: SessionsService, private storage: StorageMap) {
    this.storage.get(StorageString).subscribe((data: any) => {
      data = data.sort(function(a: MySession,b: MySession){
        return b.date.getTime() - a.date.getTime();
      });
      this.sessions = data
    });
  }

  ngOnInit() {
  }
}
