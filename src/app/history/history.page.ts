import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Athlete, Training } from '../models';
import { StorageService, TrainingsService } from '../services';
import { storageKeys } from '../utility';
import { compareDates } from '../utility/date';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  currentDay: string;
  currentDate: Date;
  items: Training[];
  selectedAthlete: Athlete;

  constructor(private trainingService: TrainingsService, private storageService: StorageService) {}

  ngOnInit() {
    this.storageService.getValue<Athlete>(storageKeys.selectedAthlete).subscribe((selected) => {
      if (selected) {
        this.selectedAthlete = selected;
        const now = new Date();
        this.onDayChange(now, selected);
      }
    });
  }

  onDayChange(newdate: Date, selectedAthlete: Athlete) {
    this.currentDate = newdate;
    this.currentDay = newdate.getDate() + '.' + (newdate.getMonth() + 1);
    this.getItems(selectedAthlete).subscribe((items) => (this.items = items));
  }

  private getItems(selectedAthlete: Athlete) {
    return this.trainingService.getList(selectedAthlete.guid).pipe(
      map((items) => {
        return items.filter((item) => compareDates(item.date, this.currentDate) === 0);
      })
    );
  }
}
