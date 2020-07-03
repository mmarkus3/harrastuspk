import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Training } from 'src/app/models';

@Component({
  selector: 'app-total-duration',
  templateUrl: 'total-duration.component.html',
  styleUrls: ['total-duration.component.scss'],
})
export class TotalDurationComponent implements OnChanges {
  @Input() items: Training[];
  totalDuration: number;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.items) {
      this.setDuration();
    }
  }

  private setDuration() {
    this.totalDuration = this.items.reduce((prev, curr) => {
      return prev + (curr.done ? curr.duration : 0);
    }, 0);
  }
}
