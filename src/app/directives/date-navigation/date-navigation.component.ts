import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
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
export class DateNavigationComponent {
  selected = input.required<Date>();
  selectDate = output<Date>();
  currentDay = computed(() => this.selected().toISOString());

  constructor() { }


  onDayChange(dateS: string) {
    const date = new Date(dateS);
    this.selectDate.emit(date);
  }

  prev() {
    const date = this.selected();
    date.setDate(date.getDate() - 1);
    this.onDayChange(date.toISOString());
  }

  next() {
    const date = this.selected();
    date.setDate(date.getDate() + 1);
    this.onDayChange(date.toISOString());
  }
}
