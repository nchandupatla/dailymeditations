import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dailymeditations';
  updateAvailable = false;
  ngOnInit() {
  }
  constructor(private swUpdate: SwUpdate) {
    this.swUpdate.available.subscribe(evt => {
      this.updateAvailable = true;
    });
  }
}
