import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '@scandium-oy/ngx-scandium';
import { map } from 'rxjs/operators';
import { AppCommonModule } from '../common.module';
import { SelectDayComponent } from '../directives/select-day/select-day.component';
import { Athlete, Training } from '../models';
import { TrainingsService } from '../services';
import { storageKeys } from '../utility';
import { compareDates } from '../utility/date';

@Component({
  standalone: true,
  selector: 'app-history-page',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  imports: [
    AppCommonModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SelectDayComponent,
  ],
})
export class HistoryPage implements OnInit {
  currentDay: string;
  currentDate: Date;
  items: Training[];
  selectedAthlete: Athlete;

  constructor(private trainingService: TrainingsService, private storageService: StorageService) { }

  ngOnInit() {
    this.storageService.getValue<Athlete>(storageKeys.selectedAthlete).subscribe((selected) => {
      if (selected) {
        this.selectedAthlete = selected;
        const now = new Date();
        this.onDayChange(now.toISOString(), selected);
      }
    });
  }

  onDayChange(newdate: string, selectedAthlete: Athlete) {
    const date = new Date(newdate);
    this.currentDate = date;
    this.currentDay = date.toISOString();
    this.getItems(selectedAthlete).subscribe((items) => (this.items = items));
  }

  private getItems(selectedAthlete: Athlete) {
    return this.trainingService.getList(selectedAthlete.guid).pipe(
      map((items) => {
        return items.filter((item) => compareDates(item.date, this.currentDate));
      })
    );
  }
}
