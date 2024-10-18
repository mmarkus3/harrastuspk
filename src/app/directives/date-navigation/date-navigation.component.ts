import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SelectDayComponent } from '../select-day/select-day.component';

@Component({
  standalone: true,
  selector: 'app-date-navigation',
  templateUrl: 'date-navigation.component.html',
  styleUrls: ['./date-navigation.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
    SelectDayComponent,
  ],
})
export class DateNavigationComponent implements OnInit, OnChanges {
  @Input() selected: Date;
  @Output() selectDate = new EventEmitter<Date>();
  currentDay: string;

  constructor() { }

  ngOnInit() {
    this.setCurrentDay(this.selected);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selected) {
      this.setCurrentDay(this.selected);
    }
  }

  onDayChange(dateS: string) {
    const date = new Date(dateS);
    this.setCurrentDay(date);
    this.selectDate.emit(date);
  }

  prev() {
    this.selected.setDate(this.selected.getDate() - 1);
    this.onDayChange(this.selected.toISOString());
  }

  next() {
    this.selected.setDate(this.selected.getDate() + 1);
    this.onDayChange(this.selected.toISOString());
  }

  private setCurrentDay(date: Date) {
    this.currentDay = date.getDate() + '.' + (date.getMonth() + 1);
  }
}
