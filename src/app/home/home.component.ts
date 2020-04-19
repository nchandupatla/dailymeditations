import { Component, OnInit } from '@angular/core';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { interval, Subscription } from 'rxjs';
import { SessionsService } from '../sessions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private sessionService: SessionsService) {
  }

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
  audio = null;
  volume = 0.5
  private minutes;
  private seconds;
  
  

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

  // audioValues = [
  //   {value: '', viewValue: 'No Music'},
  //   {value: '/assets/audio/BirdsforRestandHealing.mp3', viewValue: 'Birds for Rest and Healing'},
  //   {value: '/assets/audio/Calm_Peaceful_Relaxation.mp3', viewValue: 'Calm Peaceful and Relaxation'},
  //   {value: '/assets/audio/Deep_Meditation_Contemplation.mp3', viewValue: 'Deep Meditation and Contemplation'},
  //   {value: '/assets/audio/Emotional_Healing_InnerStrength.mp3', viewValue: 'Emotional Healing and InnerStrength'},
  //   {value: '/assets/audio/GentleRelaxationPeacefulSleep.mp3', viewValue: 'Gentle Relaxation  and Peaceful Sleep'},
  //   {value: '/assets/audio/HealingStrengthSerenity.mp3', viewValue: 'Healing Strength and Serenity'},
  //   {value: '/assets/audio/InnerBalanceSpiritualAwakening.mp3', viewValue: 'Inner Balance and Spiritual Awakening'},
  //   {value: '/assets/audio/MeditationDeepSleep.mp3', viewValue: 'Meditation Deep Sleep'},
  //   {value: '/assets/audio/PeaceofMindandDeepRelaxation.mp3', viewValue: 'Peace of Mind and Deep Relaxation'},
  //   {value: '/assets/audio/QuietContemplationandWellBeing.mp3', viewValue: 'Quiet Contemplation and Well Being'},
  //   {value: '/assets/audio/RestfulSleepandTotalRelaxation.mp3', viewValue: 'Restful Sleep and Total Relaxation'},
  //   {value: '/assets/audio/bhajan1.mp3', viewValue: 'Om Mantra'},
  //   {value: '/assets/audio/purrple-cat-spring-showers.mp3', viewValue: 'Spring Showers'},
  // ];

  audioValues = [
    {value: '', viewValue: 'No Music'},
    {value: '/assets/audio/BirdsforRestandHealing.mp3', viewValue: 'Birds for Rest and Healing'},
    {value: '/assets/audio/Calm_Peaceful_Relaxation.mp3', viewValue: 'Calm Peaceful and Relaxation'},
    {value: '/assets/audio/Deep_Meditation_Contemplation.mp3', viewValue: 'Deep Meditation and Contemplation'},
    {value: '/assets/audio/bhajan1.mp3', viewValue: 'Om Mantra'},
    {value: '/assets/audio/purrple-cat-spring-showers.mp3', viewValue: 'Spring Showers'},
  ];

  ngOnInit() {
    this.defaultTimerMsg();
  }

  start() {
    this.isStarted = true;
    this.isFinished, this.inProgress = false
    this.count = this.addMinutes(new Date(),this.selected).getTime() ;
    // this.audio = new Audio();
    this.subscription = this.source.subscribe(() => {
      const now = new Date().getTime(); 
      const t = this.count - now; 
      this.minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
      this.seconds = Math.floor((t % (1000 * 60)) / 1000); 
      this.timer =  this.minutes + "m " + this.seconds + "s "; 
      // this.playAudio()
      if (t < 0) {
        this.isFinished = true
        this.audio.src = null;
        this.defaultTimerMsg();
      } else {
        this.inProgress = true
      }
    });
  }

  stop() {
    this.subscription.unsubscribe()
    this.isStarted = false;
    this.inProgress = false
    this.defaultTimerMsg();
    this.audioUrl = null;
    // this.audio.src = null;
    this.sessionService.addToSessions({date: new Date(), minsActual: (this.selected-this.minutes), minsExpected: this.selected})
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

  playAudio(){
    this.audio.src = this.audioUrl;
    this.audio.load();
    this.audio.play();
  }

  volumeChange() {
    this.audio.volume = this.volume;
    console.log('volume changed to '+ this.audio.volume)
  }

}
