import { CommonModule } from '@angular/common';
import { Component, input, Input, output, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DatetimeHighlight } from '@ionic/core';
import { endOfDay } from 'date-fns';
import { AppCommonModule } from 'src/app/common.module';

@Component({
  standalone: true,
  selector: 'app-select-day',
  templateUrl: './select-day.component.html',
  styleUrls: ['./select-day.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
    AppCommonModule,
  ],
})
export class SelectDayComponent {

  id = input('selectDayButton');
  expand = input('block');
  color = input('secondary');
  disabled = input(false);
  format = input('dd.MM.yyyy');
  minDate = input<string>();
  maxDate = input<string>();
  name = input('general.selectDay');
  size = input('default');
  presentation = input('date');

  @Input()
  set highlightedDates(value: DatetimeHighlight[]) {
    this.highlightedDatesS.set(value);
  }

  @Input()
  set value(val: string | Date) {
    if (val) {
      const date = new Date(val);
      this.dateValue.set(endOfDay(date).toISOString());
    } else {
      this.dateValue.set(null);
    }
  }

  changed = output<string>();

  dateValue = signal<string>(null);

  highlightedDatesS = signal<DatetimeHighlight[]>([]);

  onChange(event: CustomEvent) {
    this.changed.emit(event.detail.value);
  }
}
