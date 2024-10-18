import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Training } from 'src/app/models';

@Component({
  selector: 'app-edit-training-dialog',
  templateUrl: './training.dialog.html',
  styleUrls: ['training.dialog.scss'],
})
export class EditTrainingDialogComponent {
  item: Training;

  constructor(private _modal: ModalController, navParams: NavParams) {
    this.item = navParams.get('training');
  }

  onSave(item: Training) {
    this._modal.dismiss(item);
  }

  dismiss() {
    this._modal.dismiss();
  }
}
