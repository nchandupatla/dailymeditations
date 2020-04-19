import { Component } from '@angular/core';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dailymeditations';
  faSun = faSun;
  public isStarted = false;
  public inProgress = false;
  public isFinished= false;
  public count;
  public timer;
  public selected = 5;
  checked = false;
  audioUrl =''
  finishAudioUrl = '/assets/audio/tinsha.wav'
  source = interval(1000);
  subscription: Subscription;

  timerValues = [
    {value: 1, viewValue: '5m'},
    {value: 10, viewValue: '10m'},
    {value: 15, viewValue: '15m'},
    {value: 20, viewValue: '20m'},
    {value: 25, viewValue: '25m'},
    {value: 30, viewValue: '30m'},
    {value: 35, viewValue: '35m'},
    {value: 40, viewValue: '40m'},
    {value: 45, viewValue: '45m'},
    {value: 50, viewValue: '50m'},
    {value: 55, viewValue: '55m'},
    {value: 60, viewValue: '1h'},
  ];

  audioValues = [
    {value: '', viewValue: 'No Music'},
    {value: '/assets/audio/bhajan1.mp3', viewValue: 'Audio 1'},
    {value: '/assets/audio/purrple-cat-spring-showers.mp3', viewValue: 'Audio 2'},
  ];

  ngOnInit() {
    this.defaultTimerMsg();
  }

  start() {
    this.isStarted = true;
    this.isFinished, this.inProgress = false
    this.count = this.addMinutes(new Date(),this.selected).getTime() 
    this.subscription = this.source.subscribe(() => {
      const now = new Date().getTime(); 
      const t = this.count - now; 
      const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
      const seconds = Math.floor((t % (1000 * 60)) / 1000); 
      this.timer =  minutes + "m " + seconds + "s "; 
      if (t < 0) {
        this.isFinished = true
        this.defaultTimerMsg();
      } else {
        this.inProgress = true
      }
    });
  }

  stop() {
    this.isStarted = false;
    this.inProgress = false
    this.defaultTimerMsg();
    this.audioUrl = null;
    this.subscription.unsubscribe()
  }

  reset() {
    this.stop()
    this.subscription.unsubscribe()
    this.defaultTimerMsg();
  }

  addMinutes(date, minutes) {
      return new Date(date.getTime() + minutes*60000);
  }

  defaultTimerMsg() {
    this.timer =  this.selected + "m " + "00s "; 
  }

  timerChangeHandler (event: any) {
    this.selected = event.target.value;
    this.timer =  this.selected + "m " + "00s "; 
  }

  musicChangeHandler (event: any) {
    this.audioUrl = event.target.value;
  }
}
