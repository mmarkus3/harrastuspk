import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from '@scandium-oy/ngx-scandium';
import { Subscription } from 'rxjs';
import { EditRecordDialogComponent } from '../dialog/record/edit-record.dialog';
import { Athlete, Record } from '../models';
import { RecordsService } from '../services';
import { storageKeys } from '../utility';

@Component({
  selector: 'app-stats',
  templateUrl: 'stats.page.html',
  styleUrls: ['stats.page.scss'],
})
export class StatsPage implements OnInit {
  selectedAthlete: Athlete;
  adding: boolean;
  records: Record[];
  private itemsSub: Subscription;

  constructor(
    private storageService: StorageService,
    private recordService: RecordsService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.storageService.getValue<Athlete>(storageKeys.selectedAthlete).subscribe((selected) => {
      if (selected) {
        this.selectedAthlete = selected;
        if (this.itemsSub) {
          this.itemsSub.unsubscribe();
        }
        this.itemsSub = this.getItems().subscribe((items) => (this.records = items));
      }
    });
  }

  onSave(record: Record) {
    this.recordService.save(record).then((_) => (this.adding = false));
  }

  onEdit(record: Record) {
    this.modalCtrl.create({ component: EditRecordDialogComponent, componentProps: { record } }).then((m) => {
      m.onDidDismiss().then((data) => {
        if (data.data) {
          this.recordService.update(data.data);
        }
      });
      m.present();
    });
  }

  private getItems() {
    return this.recordService.getList(this.selectedAthlete.guid);
  }
}
