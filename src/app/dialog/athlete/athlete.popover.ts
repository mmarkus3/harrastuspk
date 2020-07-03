import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Athlete } from 'src/app/models';
import { AthletesService } from 'src/app/services';

@Component({
  selector: 'app-athlete-popover',
  templateUrl: './athlete.popover.html',
  styleUrls: ['athlete.popover.scss'],
})
export class AthletePopoverComponent implements OnInit {
  athletes: Athlete[];
  adding: boolean;
  selectedAthlete: Athlete;

  constructor(private popover: PopoverController, private athletesService: AthletesService) {}

  ngOnInit() {
    this.getAthletes();
  }

  select(athlete?: Athlete) {
    this.popover.dismiss(athlete);
  }

  save(athlete: Athlete) {
    this.athletesService.save(athlete).then((_) => {
      this.adding = false;
    });
  }

  edit(athlete: Athlete) {
    this.athletesService.update(athlete).then((_) => {
      this.selectedAthlete = null;
    });
  }

  private async getAthletes() {
    const sub = await this.athletesService.getList();
    return sub.subscribe((items) => (this.athletes = items));
  }
}
