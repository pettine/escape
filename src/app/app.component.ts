import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  timer$;
  nativeWindow: any;
  myWindow;
  ticks;
  totalSecondsDefined = 0;
  subscription: Subscription;
  running = false;
  warning = false;
  formattedTime: string;
  minutes = 3;
  minutesAdd = 0;
  message: string;

  helpWindow() {
    this.myWindow = window.open('', 'MsgWindow', 'width=200,height=100');
    this.myWindow.document.write('<p id=p1>This is MsgWindow. I am 200px wide and 100px tall!</p>');
    console.log(this.myWindow);
  }

  changeContentWindow() {
    this.myWindow.document.write('<p>Changing the content</p>');
  }

  addMinutes() {
    this.totalSecondsDefined = this.totalSecondsDefined + this.minutesAdd * 60;
  }

  startTimer() {
    if (!this.running) {
      if (this.totalSecondsDefined === 0) {
        this.totalSecondsDefined = this.minutes * 60;
      }
      this.timer$ = Observable.timer(100, 1000);
      this.running = true;
      this.subscription = this.timer$.subscribe(t => {
        this.ticks = this.totalSecondsDefined - t;
        if (this.ticks === 0) {
          this.stopTimer();
        } else if (this.ticks <= 30) {
          this.warning = true;
        }
        this.formatTimer(this.ticks);
      });
    }
  }

  getWindow() {
      console.log(this.myWindow.document);
      console.log(this.myWindow.document.body.childNodes);
      console.log(this.myWindow.document.all);
      const message1 = this.myWindow.document.getElementById('messageDisplay');
      message1.innerHTML = 'text';
  }


  stopTimer() {
    this.running = false;
    this.totalSecondsDefined = this.ticks;
    this.subscription.unsubscribe();
  }

  formatTimer(totalSeconds: number) {
    const hour: number = Math.floor(totalSeconds / 3600);
    const minutes: number = Math.floor((totalSeconds - hour * 3600) / 60);
    const seconds: number = totalSeconds - hour * 3600 - minutes * 60;
    this.formattedTime = this.padZero(hour.toString()) + ':' + this.padZero(minutes.toString()) + ':' + this.padZero(seconds.toString());
  }

  padZero(timeParcel: string) {
    while (timeParcel.length < 2) {
      timeParcel = '0' + timeParcel;
    }
    return timeParcel;
  }


}
