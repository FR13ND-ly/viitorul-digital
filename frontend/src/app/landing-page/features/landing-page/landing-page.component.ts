import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, fromEvent, throttleTime } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  index$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  ngOnInit(): void {
    fromEvent(document.body, 'wheel').pipe(
      throttleTime(500)
    ).subscribe((event : any) => {
      if (event.deltaY > 0 && this.index$.value < 3) {
        this.index$.next(this.index$.value + 1)
      }
      else if (event.deltaY < 0 && this.index$.value > 1) {
        this.index$.next(this.index$.value - 1)
      }
    })
  }

  next() {
    this.index$.next(3)
  }
}
