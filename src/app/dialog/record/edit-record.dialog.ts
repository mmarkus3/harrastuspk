import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Record } from 'src/app/models';

@Component({
  selector: 'app-edit-record-dialog',
  templateUrl: './edit-record.dialog.html',
  styleUrls: ['edit-record.dialog.scss'],
})
export class EditRecordDialogComponent {
  item: Record;

  constructor(private _modal: ModalController, navParams: NavParams) {
    this.item = navParams.get('record');
  }

  onSave(item: Record) {
    this._modal.dismiss(item);
  }

  dismiss() {
    this._modal.dismiss();
  }
}
