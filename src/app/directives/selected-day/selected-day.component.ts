import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CalendarModal, CalendarModalOptions } from 'ion2-calendar';

@Component({
  selector: 'app-selected-day',
  templateUrl: 'selected-day.component.html',
  styleUrls: ['selected-day.component.scss'],
})
export class SelectedDayComponent {
  @Input() currentDay: string;
  @Output() changed = new EventEmitter<Date>();

  private options: CalendarModalOptions = {
    weekdays: ['SU', 'MA', 'TI', 'KE', 'TO', 'PE', 'LA'],
    weekStart: 1,
    defaultDate: new Date(),
    canBackwardsSelected: true,
  };

  constructor(private modalCtrl: ModalController, private translate: TranslateService) {}

  onCalendar() {
    this.options.closeLabel = this.translate.instant('general.cancel');
    this.options.doneLabel = this.translate.instant('general.done');
    this.options.title = this.translate.instant('calendar.title');
    this.modalCtrl.create({ component: CalendarModal, componentProps: { options: this.options } }).then((modal) => {
      modal.present();
      modal.onDidDismiss().then((data) => {
        if (data.data) {
          this.changed.emit(data.data.dateObj);
        }
      });
    });
  }
}
