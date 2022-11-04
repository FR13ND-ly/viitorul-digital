import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  constructor() { }

  @Output() scroll = new EventEmitter()

  ngOnInit(): void {
  }

  onScroll() {
    this.scroll.emit()
  }
}
