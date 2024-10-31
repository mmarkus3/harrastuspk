import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, PopoverController } from '@ionic/angular';
import { AuthService, StorageService } from '@scandium-oy/ngx-scandium';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppCommonModule } from '../common.module';
import { AthletePopoverComponent } from '../dialog/athlete/athlete.popover';
import { LoginDialogComponent } from '../dialog/login/login.dialog';
import { EditTrainingDialogComponent } from '../dialog/training/training.dialog';
import { DateNavigationComponent } from '../directives/date-navigation/date-navigation.component';
import { Athlete, Training } from '../models';
import {
  DurationService,
  RecordTypeService,
  TemplateService,
  TrainingsService,
  TrainingTypeService,
} from '../services';
import { storageKeys } from '../utility';
import { compareDates } from '../utility/date';

@Component({
  standalone: true,
  selector: 'app-home-page',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    AppCommonModule,
    CommonModule,
    FormsModule,
    IonicModule,
    DateNavigationComponent,
  ],
})
export class HomePage {
  private durationService = inject(DurationService);
  private fireAuth = inject(AuthService);
  private modalCtrl = inject(ModalController);
  private popoverCtrl = inject(PopoverController);
  private recordTypeService = inject(RecordTypeService);
  private storageService = inject(StorageService);
  private templateService = inject(TemplateService);
  private trainingService = inject(TrainingsService);
  private trainingTypeService = inject(TrainingTypeService);

  currentDate = signal<Date>(null);
  items: Training[];
  adding = signal(false);
  selectedAthlete = signal<Athlete>(null);
  user: User;
  private itemsSub: Subscription;

  constructor() {
    this.fireAuth.getUser().pipe(
      takeUntilDestroyed(),
    ).subscribe((user) => {
      if (user) {
        this.user = user;
        this.fetchData(user.uid);
        this.storageService.getValue<Athlete>(storageKeys.selectedAthlete).subscribe((selected) => {
          this.selectedAthlete.set(selected);
          if (this.selectedAthlete) {
            this.selectToday();
          } else {
            this.selectedAthlete.set(null);
          }
        });
      } else {
        this.modalCtrl.create({ component: LoginDialogComponent }).then((m) => {
          m.present();
        });
      }
    });
  }

  onAthlete(_: any) {
    this.popoverCtrl
      .create({
        component: AthletePopoverComponent,
        translucent: true,
        backdropDismiss: false,
        cssClass: 'athletes-popover',
        componentProps: {},
      })
      .then((popover) => {
        popover.present();
        popover.onDidDismiss().then((data) => {
          if (data.data) {
            this.storageService.set(storageKeys.selectedAthlete, data.data);
          }
        });
      });
  }

  private selectToday() {
    const now = new Date();
    this.onDayChange(now);
  }

  onDayChange(newdate: Date) {
    this.currentDate.set(newdate);
    if (this.itemsSub) {
      this.itemsSub.unsubscribe();
    }
    this.itemsSub = this.getItems().subscribe((items) => (this.items = items));
  }

  saved(item: Training) {
    this.trainingService.save(item).then((_) => {
      this.adding.set(false);
    });
  }

  onEdit(item: Training) {
    this.modalCtrl
      .create({ component: EditTrainingDialogComponent, componentProps: { training: item } })
      .then((m) => {
        m.present();
        m.onDidDismiss().then((data) => {
          if (data.data) {
            this.trainingService.update(data.data).then((_) => { });
          }
        });
      });
  }

  onDelete(item: Training) {
    this.trainingService.remove(item).then((_) => { });
  }

  onDone(item: Training) {
    this.trainingService.done(item).then((_) => { });
  }

  private getItems() {
    return this.trainingService.getList(this.selectedAthlete().guid).pipe(
      map((items) => {
        return items.filter((item) => compareDates(item.date, this.currentDate()));
      })
    );
  }

  private fetchData(userGuid: string) {
    this.trainingTypeService.getList().subscribe((trainingTypes) => {
      this.storageService.set(storageKeys.trainingTypes, trainingTypes);
    });
    this.recordTypeService.getList().subscribe((recordTypes) => {
      this.storageService.set(storageKeys.recordTypes, recordTypes);
    });
    this.durationService.getList().subscribe((durations) => {
      this.storageService.set(storageKeys.durations, durations);
    });
    this.templateService.getList(userGuid).subscribe((templates) => {
      this.storageService.set(storageKeys.templates, templates);
    });
  }
}
