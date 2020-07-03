import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-date-navigation',
  templateUrl: 'date-navigation.component.html',
  styleUrls: ['./date-navigation.component.scss'],
})
export class DateNavigationComponent implements OnInit, OnChanges {
  @Input() selected: Date;
  @Output() selectDate = new EventEmitter<Date>();
  currentDay: string;

  constructor() {}

  ngOnInit() {
    this.setCurrentDay(this.selected);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selected) {
      this.setCurrentDay(this.selected);
    }
  }

  onDayChange(date: Date) {
    this.setCurrentDay(date);
    this.selectDate.emit(date);
  }

  prev() {
    this.selected.setDate(this.selected.getDate() - 1);
    this.onDayChange(this.selected);
  }

  next() {
    this.selected.setDate(this.selected.getDate() + 1);
    this.onDayChange(this.selected);
  }

  private setCurrentDay(date: Date) {
    this.currentDay = date.getDate() + '.' + (date.getMonth() + 1);
  }
}
